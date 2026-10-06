import React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">LMS AI (Public)</h1>
        <nav>
          <a href="/login" className="text-primary hover:underline">Login</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
