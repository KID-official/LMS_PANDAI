/**
 * Pure TypeScript QR Code Matrix & SVG Generator
 * Generates standards-compliant Model 2 QR Code vectors without any external npm packages.
 */

// ── Galois Field GF(256) Tables & Arithmetic ──
const GF256_EXP = new Uint8Array(512);
const GF256_LOG = new Uint8Array(256);

(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF256_EXP[i] = x;
    GF256_EXP[i + 255] = x;
    GF256_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return GF256_EXP[GF256_LOG[x] + GF256_LOG[y]];
}

function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    const factor = GF256_EXP[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], factor);
    }
    poly = next;
  }
  return poly;
}

function rsCompute(data: number[], degree: number): number[] {
  const gen = rsGeneratorPoly(degree);
  const res = new Array(degree).fill(0);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ res[0];
    res.shift();
    res.push(0);
    if (factor !== 0) {
      for (let j = 0; j < degree; j++) {
        res[j] ^= gfMul(gen[j + 1], factor);
      }
    }
  }
  return res;
}

interface QrVersionSpec {
  version: number;
  size: number;
  ec: 'L' | 'M';
  ecPerBlock: number;
  g1Blocks: number;
  g1Data: number;
  g2Blocks: number;
  g2Data: number;
  align: number[];
}

const QR_TABLE: QrVersionSpec[] = [
  // V1 (21x21)
  { version: 1, size: 21, ec: 'L', ecPerBlock: 7, g1Blocks: 1, g1Data: 19, g2Blocks: 0, g2Data: 0, align: [] },
  { version: 1, size: 21, ec: 'M', ecPerBlock: 10, g1Blocks: 1, g1Data: 16, g2Blocks: 0, g2Data: 0, align: [] },
  // V2 (25x25)
  { version: 2, size: 25, ec: 'L', ecPerBlock: 10, g1Blocks: 1, g1Data: 34, g2Blocks: 0, g2Data: 0, align: [6, 18] },
  { version: 2, size: 25, ec: 'M', ecPerBlock: 16, g1Blocks: 1, g1Data: 28, g2Blocks: 0, g2Data: 0, align: [6, 18] },
  // V3 (29x29)
  { version: 3, size: 29, ec: 'L', ecPerBlock: 15, g1Blocks: 1, g1Data: 55, g2Blocks: 0, g2Data: 0, align: [6, 22] },
  { version: 3, size: 29, ec: 'M', ecPerBlock: 26, g1Blocks: 1, g1Data: 44, g2Blocks: 0, g2Data: 0, align: [6, 22] },
  // V4 (33x33)
  { version: 4, size: 33, ec: 'L', ecPerBlock: 20, g1Blocks: 1, g1Data: 80, g2Blocks: 0, g2Data: 0, align: [6, 26] },
  { version: 4, size: 33, ec: 'M', ecPerBlock: 18, g1Blocks: 2, g1Data: 32, g2Blocks: 0, g2Data: 0, align: [6, 26] },
  // V5 (37x37)
  { version: 5, size: 37, ec: 'L', ecPerBlock: 26, g1Blocks: 1, g1Data: 108, g2Blocks: 0, g2Data: 0, align: [6, 30] },
  { version: 5, size: 37, ec: 'M', ecPerBlock: 24, g1Blocks: 2, g1Data: 43, g2Blocks: 0, g2Data: 0, align: [6, 30] },
  // V6 (41x41)
  { version: 6, size: 41, ec: 'L', ecPerBlock: 18, g1Blocks: 2, g1Data: 68, g2Blocks: 0, g2Data: 0, align: [6, 34] },
  { version: 6, size: 41, ec: 'M', ecPerBlock: 16, g1Blocks: 4, g1Data: 27, g2Blocks: 0, g2Data: 0, align: [6, 34] },
  // V7 (45x45)
  { version: 7, size: 45, ec: 'L', ecPerBlock: 20, g1Blocks: 2, g1Data: 78, g2Blocks: 0, g2Data: 0, align: [6, 22, 38] },
  { version: 7, size: 45, ec: 'M', ecPerBlock: 18, g1Blocks: 4, g1Data: 31, g2Blocks: 0, g2Data: 0, align: [6, 22, 38] },
];

function stringToUtf8ByteArray(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) {
      bytes.push(charcode);
    } else if (charcode < 0x800) {
      bytes.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      bytes.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
    } else {
      i++;
      charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      bytes.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return bytes;
}

function encodeData(text: string, spec: QrVersionSpec): number[] {
  const utf8Bytes = stringToUtf8ByteArray(text);
  const totalDataBytes = spec.g1Blocks * spec.g1Data + spec.g2Blocks * spec.g2Data;

  let bits = '0100'; // Byte mode indicator
  const lenBits = utf8Bytes.length.toString(2).padStart(8, '0');
  bits += lenBits;

  for (let i = 0; i < utf8Bytes.length; i++) {
    bits += utf8Bytes[i].toString(2).padStart(8, '0');
  }

  const maxBits = totalDataBytes * 8;
  const termLen = Math.min(4, maxBits - bits.length);
  for (let i = 0; i < termLen; i++) bits += '0';

  while (bits.length % 8 !== 0) {
    bits += '0';
  }

  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2));
  }

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bytes.length < totalDataBytes) {
    bytes.push(padBytes[padIdx % 2]);
    padIdx++;
  }

  const blocks: Array<{ data: number[]; ec: number[] }> = [];
  let byteOffset = 0;
  for (let b = 0; b < spec.g1Blocks; b++) {
    const dataBlock = bytes.slice(byteOffset, byteOffset + spec.g1Data);
    byteOffset += spec.g1Data;
    const ecBlock = rsCompute(dataBlock, spec.ecPerBlock);
    blocks.push({ data: dataBlock, ec: ecBlock });
  }
  for (let b = 0; b < spec.g2Blocks; b++) {
    const dataBlock = bytes.slice(byteOffset, byteOffset + spec.g2Data);
    byteOffset += spec.g2Data;
    const ecBlock = rsCompute(dataBlock, spec.ecPerBlock);
    blocks.push({ data: dataBlock, ec: ecBlock });
  }

  const interleaved: number[] = [];
  const maxDataLen = Math.max(...blocks.map((b) => b.data.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of blocks) {
      if (i < block.data.length) {
        interleaved.push(block.data[i]);
      }
    }
  }

  const maxEcLen = spec.ecPerBlock;
  for (let i = 0; i < maxEcLen; i++) {
    for (const block of blocks) {
      if (i < block.ec.length) {
        interleaved.push(block.ec[i]);
      }
    }
  }

  return interleaved;
}

/**
 * Generates a 2D boolean array representing the QR code matrix (true = dark, false = light).
 */
export function generateQrMatrix(text: string): boolean[][] {
  const utf8Len = stringToUtf8ByteArray(text).length;
  const spec =
    QR_TABLE.find((s) => {
      const totalData = s.g1Blocks * s.g1Data + s.g2Blocks * s.g2Data;
      return totalData >= utf8Len + 3 && s.ec === 'M';
    }) ||
    QR_TABLE.find((s) => {
      const totalData = s.g1Blocks * s.g1Data + s.g2Blocks * s.g2Data;
      return totalData >= utf8Len + 2;
    });

  if (!spec) {
    throw new Error('Data payload exceeds maximum capacity for standalone QR generator');
  }

  const codewords = encodeData(text, spec);
  const size = spec.size;

  const matrix: Array<Array<boolean | null>> = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );
  const isFunction: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  function setModule(r: number, c: number, val: boolean) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      matrix[r][c] = val;
      isFunction[r][c] = true;
    }
  }

  function placeFinder(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          const isBlack =
            r === 0 ||
            r === 6 ||
            c === 0 ||
            c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4);
          setModule(nr, nc, isBlack);
        } else {
          setModule(nr, nc, false);
        }
      }
    }
  }

  // 1. Finder patterns
  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // 2. Alignment patterns
  if (spec.align && spec.align.length >= 2) {
    const positions = spec.align;
    for (const r of positions) {
      for (const c of positions) {
        if (
          (r < 9 && c < 9) ||
          (r < 9 && c >= size - 9) ||
          (r >= size - 9 && c < 9)
        ) {
          continue;
        }
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const isBlack = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
            setModule(r + dr, c + dc, isBlack);
          }
        }
      }
    }
  }

  // 3. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (matrix[6][i] === null) setModule(6, i, i % 2 === 0);
    if (matrix[i][6] === null) setModule(i, 6, i % 2 === 0);
  }

  // 4. Dark module
  setModule(size - 8, 8, true);

  // 5. Reserve format info
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) {
      if (matrix[8][i] === null) isFunction[8][i] = true;
      if (matrix[i][8] === null) isFunction[i][8] = true;
    }
  }
  for (let i = 0; i < 8; i++) {
    if (matrix[8][size - 1 - i] === null) isFunction[8][size - 1 - i] = true;
    if (matrix[size - 1 - i][8] === null) isFunction[size - 1 - i][8] = true;
  }

  // 6. Place data bits
  let bitIndex = 0;
  const bitString = codewords.map((c) => c.toString(2).padStart(8, '0')).join('');

  let upward = true;
  for (let rightCol = size - 1; rightCol > 0; rightCol -= 2) {
    if (rightCol === 6) rightCol--;
    const colLeft = rightCol - 1;
    const rowList = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const r of rowList) {
      for (const c of [rightCol, colLeft]) {
        if (!isFunction[r][c]) {
          const bit = bitIndex < bitString.length ? bitString[bitIndex] === '1' : false;
          matrix[r][c] = bit;
          bitIndex++;
        }
      }
    }
    upward = !upward;
  }

  // 7. Apply standard mask (Mask 0: (r + c) % 2 === 0)
  const maskPattern = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isFunction[r][c]) {
        if ((r + c) % 2 === 0) {
          matrix[r][c] = !matrix[r][c];
        }
      }
    }
  }

  // 8. Place format info
  const ecBits = spec.ec === 'M' ? 0 : 1;
  const formatData = (ecBits << 3) | maskPattern;
  let bch = formatData << 10;
  const poly = 0x537;
  for (let i = 14; i >= 10; i--) {
    if ((bch >> i) & 1) {
      bch ^= poly << (i - 10);
    }
  }
  const formatVal = ((formatData << 10) | bch) ^ 0x5412;
  const formatString = formatVal.toString(2).padStart(15, '0');

  const formatOrderTopLeft = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
    [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  const formatOrderOther = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
  ];

  for (let i = 0; i < 15; i++) {
    const bit = formatString[14 - i] === '1';
    const [r1, c1] = formatOrderTopLeft[i];
    matrix[r1][c1] = bit;
    const [r2, c2] = formatOrderOther[i];
    matrix[r2][c2] = bit;
  }

  return matrix.map((row) => row.map((val) => !!val));
}

export interface QrSvgOptions {
  size?: number;
  padding?: number;
  fgColor?: string;
  bgColor?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Generates an SVG string representation of the QR code.
 */
export function generateQrSvgString(text: string, options: QrSvgOptions = {}): string {
  const {
    padding = 2,
    fgColor = '#061B38',
    bgColor = '#FFFFFF',
    size = 120,
    ariaLabel = 'Kode QR Verifikasi Sertifikat',
  } = options;

  const matrix = generateQrMatrix(text);
  const matrixSize = matrix.length;
  const viewBoxSize = matrixSize + padding * 2;

  let pathData = '';
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (matrix[r][c]) {
        const x = c + padding;
        const y = r + padding;
        pathData += `M${x},${y}h1v1h-1z `;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" width="${size}" height="${size}" role="img" aria-label="${ariaLabel}">
    ${bgColor ? `<rect width="${viewBoxSize}" height="${viewBoxSize}" fill="${bgColor}" rx="1"/>` : ''}
    <path d="${pathData}" fill="${fgColor}" shape-rendering="crispEdges"/>
  </svg>`.trim();
}

/**
 * Generates a Data URL (data:image/svg+xml;utf8,...) for direct use in <img src="..." />
 */
export function generateQrDataUrl(text: string, options: QrSvgOptions = {}): string {
  const svg = generateQrSvgString(text, options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
