
import React from 'react';
import type { PredictionResult } from '../types';
import { TargetIcon, CheckCircleIcon, ExclamationIcon, QuestionMarkCircleIcon } from './icons'; 

export const PredictionResultDisplay: React.FC<{ prediction: PredictionResult }> = ({ prediction }) => {
  const { opponent, message, ruleApplied } = prediction;

  let bgColor = "bg-slate-700";
  let borderColor = "border-slate-600";
  let textColor = "text-slate-100";
  let IconComponent = QuestionMarkCircleIcon;

  if (opponent && opponent !== "Acak") { // Changed "Random" to "Acak"
    bgColor = "bg-green-800"; 
    borderColor = "border-green-600";
    textColor = "text-green-100";
    IconComponent = TargetIcon;
  } else if (opponent === "Acak") { // Changed "Random" to "Acak"
    bgColor = "bg-sky-800"; 
    borderColor = "border-sky-600";
    textColor = "text-sky-100";
    IconComponent = CheckCircleIcon; 
  } else if (message && !opponent) { 
    bgColor = "bg-amber-800"; 
    borderColor = "border-amber-600";
    textColor = "text-amber-100";
    IconComponent = ExclamationIcon;
  }

  return (
    <section className={`p-6 rounded-xl shadow-2xl ring-1 ring-slate-700 ${bgColor} border ${borderColor} transition-all duration-300`}>
      <h2 className="text-2xl font-semibold text-sky-400 mb-4 border-b border-slate-600 pb-3">
        Hasil Prediksi
      </h2>
      <div className={`p-6 rounded-lg ${bgColor} border ${borderColor}`}>
        <div className="flex items-start">
          <IconComponent className={`h-8 w-8 mr-4 shrink-0 ${textColor} ${opponent && opponent !== "Acak" ? 'text-green-300' : opponent === "Acak" ? 'text-sky-300' : 'text-amber-300'}`} />
          <div>
            {opponent && (
              <p className={`text-xl font-bold ${textColor} ${opponent && opponent !== "Acak" ? 'text-green-200' : opponent === "Acak" ? 'text-sky-200' : 'text-slate-100'}`}>
                Prediksi Lawan: <span className="text-2xl">{opponent}</span>
              </p>
            )}
            <p className={`mt-1 text-md ${textColor} ${!opponent && message ? 'text-amber-100' : 'text-slate-300'}`}>
              {message || "Belum ada prediksi tersedia."}
            </p>
            {ruleApplied && (
              <p className="mt-2 text-xs text-slate-400">
                <span className="font-semibold">Aturan Diterapkan:</span> {ruleApplied}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
