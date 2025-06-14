
import React from 'react';
import { MAX_PREDICTION_ROUND } from '../types';
import { SparklesIcon, RefreshIcon } from './icons'; 

interface PredictionControlsProps {
  predictForRound: number;
  onPredictForRoundChange: (round: number) => void;
  onPredict: () => void;
  onResetData: () => void;
  maxRound: number;
}

export const PredictionControls: React.FC<PredictionControlsProps> = ({
  predictForRound,
  onPredictForRoundChange,
  onPredict,
  onResetData,
  maxRound
}) => {
  const roundOptions = Array.from({ length: maxRound }, (_, i) => i + 1);

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-2xl ring-1 ring-slate-700">
      <h2 className="text-2xl font-semibold text-sky-400 mb-6 border-b border-slate-700 pb-3">
        3. Prediksi Lawan
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
        <div className="flex-grow w-full sm:w-auto">
          <label htmlFor="predict-for-round" className="block text-sm font-medium text-slate-300 mb-1">
            Prediksi untuk Ronde:
          </label>
          <select
            id="predict-for-round"
            value={predictForRound}
            onChange={(e) => onPredictForRoundChange(Number(e.target.value))}
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md p-3 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-150"
          >
            {roundOptions.map(round => (
              <option key={round} value={round}>
                Ronde {round}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onPredict}
          className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center justify-center"
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          Prediksi
        </button>
        <button
          onClick={onResetData}
          className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-slate-100 font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center justify-center"
        >
          <RefreshIcon className="h-5 w-5 mr-2" />
          Reset Data
        </button>
      </div>
    </section>
  );
};
