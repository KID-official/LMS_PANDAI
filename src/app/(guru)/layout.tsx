import React from 'react';

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Portal Guru</h2>
        <nav className="space-y-2">
          <a href="/guru/dashboard" className="block py-2 px-3 hover:bg-slate-800 rounded">Dashboard</a>
          <a href="/guru/students" className="block py-2 px-3 hover:bg-slate-800 rounded">Kelola Siswa</a>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-50 p-6">
        {children}
      </main>
    </div>
  );
}
