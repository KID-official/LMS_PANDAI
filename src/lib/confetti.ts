'use client';

/**
 * Pure Canvas-based & DOM-based Confetti Particle Utility
 * Zero npm dependencies, high-performance 60fps particle celebration.
 */

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  color: string;
  opacity: number;
  shape: 'rect' | 'circle' | 'strip';
}

const CELEBRATION_COLORS = [
  '#7F54F8', // Violet primary
  '#6636DE', // Primary ink
  '#3A4BD4', // Royal blue info
  '#5566EE', // Secondary container
  '#008378', // Teal success
  '#89F5E7', // Soft cyan
  '#FFB703', // Golden trophy
  '#FB8500', // Amber joy
  '#E8DEFF', // Lavender light
];

export function launchConfetti(durationMs: number = 2800): void {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.id = 'pure-confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const particleCount = 80;
  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const isLeftSide = i % 2 === 0;
    const startX = isLeftSide
      ? width * 0.15 + (Math.random() - 0.5) * 80
      : width * 0.85 + (Math.random() - 0.5) * 80;
    const startY = height * 0.45 + (Math.random() - 0.5) * 100;

    const angle = isLeftSide
      ? (Math.PI / 180) * (Math.random() * 50 + 20) // shoot right-upwards
      : (Math.PI / 180) * (Math.random() * 50 + 110); // shoot left-upwards

    const speed = Math.random() * 14 + 10;

    particles.push({
      x: startX,
      y: startY,
      w: Math.random() * 9 + 6,
      h: Math.random() * 6 + 4,
      vx: Math.cos(angle) * speed * (isLeftSide ? 1 : -1),
      vy: -Math.abs(Math.sin(angle) * speed),
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.2,
      color: CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'strip',
    });
  }

  const startTime = performance.now();

  function animate(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);

    ctx?.clearRect(0, 0, width, height);

    let activeParticles = 0;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.vx *= 0.985; // Air friction
      p.angle += p.vAngle;

      if (progress > 0.6) {
        p.opacity = Math.max(0, 1 - (progress - 0.6) / 0.4);
      }

      if (p.y < height + 40 && p.opacity > 0) {
        activeParticles++;
        if (ctx) {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'strip') {
            ctx.fillRect(-p.w, -p.h / 3, p.w * 2, p.h / 1.5);
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
        }
      }
    }

    if (activeParticles > 0 && progress < 1) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animate);
}
