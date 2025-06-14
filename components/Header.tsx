
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">
        Prediktor Lawan MCGG
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Susun strategi pertandingan Magic Chess Go Go Anda dengan memprediksi lawan berikutnya!
      </p>
    </header>
  );
};
