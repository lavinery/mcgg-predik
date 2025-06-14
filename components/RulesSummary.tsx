
import React,  { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons'; 

export const RulesSummary: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const rules = [
    { round: "1 & 2", description: "Lawan dipilih secara acak oleh sistem." },
    { round: "3", description: "Anda menghadapi lawan yang melawan musuh Ronde 1 Anda di Ronde 2." },
    { round: "4", description: "Lawan dipilih secara acak oleh sistem." },
    { round: "5",description: "Anda menghadapi lawan yang melawan musuh Ronde 1 Anda di Ronde 4." },
    { round: "6", description: "Anda menghadapi lawan yang melawan musuh Ronde 3 Anda di Ronde 5." },
    { round: "7", description: "Anda menghadapi pemain terakhir yang belum pernah Anda temui." },
    { round: "8+", description: "Siklus lawan dari Ronde 1-7 berulang, hingga ada pemain yang tereliminasi, yang berpotensi mengacak polanya lagi." },
  ];

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-2xl ring-1 ring-slate-700 mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-sky-400 mb-2 focus:outline-none"
      >
        Ringkasan Aturan Prediksi
        {isOpen ? <ChevronUpIcon className="h-6 w-6 text-sky-400" /> : <ChevronDownIcon className="h-6 w-6 text-sky-400" />}
      </button>
      {isOpen && (
        <div className="mt-4 space-y-3 text-slate-300 transition-all duration-300 ease-in-out">
          {rules.map(rule => (
            <div key={rule.round} className="p-3 bg-slate-700 rounded-md shadow">
              <strong className="text-sky-300">Ronde {rule.round}:</strong>
              <p className="text-sm text-slate-300 ml-1">{rule.description}</p>
            </div>
          ))}
           <p className="text-xs text-slate-500 mt-4">Catatan: Ronde NPC/Monster umumnya tidak dihitung saat menentukan lawan pemain.</p>
        </div>
      )}
    </section>
  );
};
