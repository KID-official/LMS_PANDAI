import React from 'react';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold text-slate-800">Portal Siswa</h1>
        <div>Menu Siswa</div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
