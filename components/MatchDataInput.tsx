
import React from 'react';
import type { YourHistory, KeyOpponentMatches, KeyOpponentMatchKey } from '../types';
import { NPC_OPPONENT, NOT_SET_OPPONENT } from '../types';

interface MatchDataInputProps {
  opponentNames: string[];
  yourHistory: YourHistory;
  onYourHistoryChange: (round: number, opponentName: string | null) => void;
  keyOpponentMatches: KeyOpponentMatches;
  onKeyMatchChange: (key: KeyOpponentMatchKey, opponentName: string | null) => void;
}

const SelectOpponentDropdown: React.FC<{
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: string[];
  disabled?: boolean;
  dynamicLabelContent?: string;
}> = ({ id, label, value, onChange, options, disabled = false, dynamicLabelContent }) => {
  const displayLabel = dynamicLabelContent ? label.replace('[PLAYER_NAME]', dynamicLabelContent) : label;
  
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium text-slate-300 mb-1 ${disabled ? 'opacity-50' : ''}`}>
        {displayLabel}
      </label>
      <select
        id={id}
        value={value ?? NOT_SET_OPPONENT}
        onChange={(e) => onChange(e.target.value === NOT_SET_OPPONENT ? null : e.target.value)}
        disabled={disabled}
        className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md p-3 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value={NOT_SET_OPPONENT}>-- Pilih Lawan --</option>
        <option value={NPC_OPPONENT}>{NPC_OPPONENT}</option>
        {options.map((opName) => (
          opName && opName.trim() !== '' && <option key={opName} value={opName}>{opName}</option>
        ))}
      </select>
    </div>
  );
};

export const MatchDataInput: React.FC<MatchDataInputProps> = ({
  opponentNames,
  yourHistory,
  onYourHistoryChange,
  keyOpponentMatches,
  onKeyMatchChange,
}) => {
  const validOpponentOptions = opponentNames.filter(name => name && name.trim() !== '');

  const yourR1Opp = yourHistory[1] && yourHistory[1] !== NPC_OPPONENT && opponentNames.includes(yourHistory[1]) ? yourHistory[1] : "Lawan R1 Anda";
  const yourR3Opp = yourHistory[3] && yourHistory[3] !== NPC_OPPONENT && opponentNames.includes(yourHistory[3]) ? yourHistory[3] : "Lawan R3 Anda";

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-2xl ring-1 ring-slate-700">
      <h2 className="text-2xl font-semibold text-sky-400 mb-6 border-b border-slate-700 pb-3">
        2. Input Riwayat Pertandingan
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-slate-200 mb-3">Lawan Anda Per Ronde:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(round => (
              <SelectOpponentDropdown
                key={`your-history-r${round}`}
                id={`your-history-r${round}`}
                label={`Lawan Anda di Ronde ${round}`}
                value={yourHistory[round]}
                onChange={(val) => onYourHistoryChange(round, val)}
                options={validOpponentOptions}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-200 mb-3 pt-4 border-t border-slate-700">Pertemuan Lawan Kunci:</h3>
          <p className="text-sm text-slate-400 mb-4">Informasi ini penting untuk prediksi ronde tertentu.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectOpponentDropdown
              id="r1-opp-r2-match"
              label="Siapa yang dihadapi [PLAYER_NAME] di Ronde 2?"
              dynamicLabelContent={yourR1Opp}
              value={keyOpponentMatches.r1Opponent_vs_r2}
              onChange={(val) => onKeyMatchChange('r1Opponent_vs_r2', val)}
              options={validOpponentOptions.filter(op => op !== yourHistory[1])}
              disabled={!yourHistory[1] || yourHistory[1] === NPC_OPPONENT}
            />
            <SelectOpponentDropdown
              id="r1-opp-r4-match"
              label="Siapa yang dihadapi [PLAYER_NAME] di Ronde 4?"
              dynamicLabelContent={yourR1Opp}
              value={keyOpponentMatches.r1Opponent_vs_r4}
              onChange={(val) => onKeyMatchChange('r1Opponent_vs_r4', val)}
              options={validOpponentOptions.filter(op => op !== yourHistory[1])}
              disabled={!yourHistory[1] || yourHistory[1] === NPC_OPPONENT}
            />
            <SelectOpponentDropdown
              id="r3-opp-r5-match"
              label="Siapa yang dihadapi [PLAYER_NAME] di Ronde 5?"
              dynamicLabelContent={yourR3Opp}
              value={keyOpponentMatches.r3Opponent_vs_r5}
              onChange={(val) => onKeyMatchChange('r3Opponent_vs_r5', val)}
              options={validOpponentOptions.filter(op => op !== yourHistory[3])}
              disabled={!yourHistory[3] || yourHistory[3] === NPC_OPPONENT}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
