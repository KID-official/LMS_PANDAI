import React from 'react';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-indigo-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Super Admin</h2>
        <nav className="space-y-2">
          <a href="/superadmin/dashboard" className="block py-2 px-3 hover:bg-indigo-800 rounded">Dashboard</a>
          <a href="/superadmin/teachers" className="block py-2 px-3 hover:bg-indigo-800 rounded">Kelola Guru</a>
          <a href="/superadmin/import" className="block py-2 px-3 hover:bg-indigo-800 rounded">Bulk Import</a>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-50 p-6">
        {children}
      </main>
    </div>
  );
}
