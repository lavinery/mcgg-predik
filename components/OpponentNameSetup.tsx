
import React from 'react';
import { InfoIcon } from './icons'; 

interface OpponentNameSetupProps {
  opponentNames: string[];
  onNameChange: (index: number, name: string) => void;
  isUnique: boolean;
}

export const OpponentNameSetup: React.FC<OpponentNameSetupProps> = ({ opponentNames, onNameChange, isUnique }) => {
  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-2xl ring-1 ring-slate-700">
      <h2 className="text-2xl font-semibold text-sky-400 mb-6 border-b border-slate-700 pb-3">
        1. Konfigurasi Lawan
      </h2>
      <p className="text-slate-400 mb-4">Masukkan nama 7 pemain lain di pertandingan Anda.</p>
      {!isUnique && (
         <div className="mb-4 p-3 bg-red-700 border border-red-500 text-red-100 rounded-md flex items-center">
           <InfoIcon className="h-5 w-5 mr-2 shrink-0" />
           <span>Peringatan: Nama lawan harus unik untuk prediksi Ronde 7 yang akurat.</span>
         </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {opponentNames.map((name, index) => (
          <div key={index}>
            <label htmlFor={`opponent-${index}`} className="block text-sm font-medium text-slate-300 mb-1">
              Lawan {index + 1}
            </label>
            <input
              type="text"
              id={`opponent-${index}`}
              value={name}
              onChange={(e) => onNameChange(index, e.target.value)}
              placeholder={`Masukkan nama untuk Lawan ${index + 1}`}
              className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md p-3 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-150"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
