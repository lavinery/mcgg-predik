
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 text-center text-slate-500 border-t border-slate-700">
      <p className="text-sm">
        Prediktor Lawan MCGG &copy; {new Date().getFullYear()}. 
        <br className="sm:hidden"/>
        Dibuat untuk keunggulan strategis. Semoga berhasil dalam pertandingan Anda!
      </p>
    </footer>
  );
};
