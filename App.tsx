
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { OpponentNameSetup } from './components/OpponentNameSetup';
import { MatchDataInput } from './components/MatchDataInput';
import { PredictionControls } from './components/PredictionControls';
import { PredictionResultDisplay } from './components/PredictionResultDisplay';
import { RulesSummary } from './components/RulesSummary';
import { Footer } from './components/Footer';
import type { PredictionResult, KeyOpponentMatches, YourHistory, KeyOpponentMatchKey } from './types';
import { NPC_OPPONENT, NOT_SET_OPPONENT, MAX_PREDICTION_ROUND } from './types';

const App: React.FC = () => {
  const initialOpponentNames = Array(7).fill('').map((_, i) => `Lawan ${i + 1}`);
  const [opponentNames, setOpponentNames] = useState<string[]>(initialOpponentNames);
  
  const initialYourHistory: YourHistory = {
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null // Added 7 for R8+ cycle
  };
  const [yourHistory, setYourHistory] = useState<YourHistory>(initialYourHistory);

  const initialKeyOpponentMatches: KeyOpponentMatches = {
    r1Opponent_vs_r2: null,
    r1Opponent_vs_r4: null,
    r3Opponent_vs_r5: null,
  };
  const [keyOpponentMatches, setKeyOpponentMatches] = useState<KeyOpponentMatches>(initialKeyOpponentMatches);
  
  const [predictForRound, setPredictForRound] = useState<number>(1);
  const [prediction, setPrediction] = useState<PredictionResult>({
    opponent: null,
    message: 'Masukkan data dan pilih ronde untuk prediksi.',
    ruleApplied: null,
  });

  const handleOpponentNameChange = useCallback((index: number, name: string) => {
    setOpponentNames(prev => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  }, []);

  const handleYourHistoryChange = useCallback((round: number, opponentName: string | null) => {
    setYourHistory(prev => ({ ...prev, [round]: opponentName === NOT_SET_OPPONENT ? null : opponentName }));
  }, []);

  const handleKeyMatchChange = useCallback((key: KeyOpponentMatchKey, opponentName: string | null) => {
    setKeyOpponentMatches(prev => ({ ...prev, [key]: opponentName === NOT_SET_OPPONENT ? null : opponentName }));
  }, []);

  const calculateR7Prediction = useCallback((currentOpponentNames: string[], currentYourHistory: YourHistory): { opponent: string | null; message: string } => {
    const facedPlayerOpponentsInR1toR6: string[] = [];
    for (let i = 1; i <= 6; i++) {
        const opp = currentYourHistory[i];
        if (opp && opp !== NPC_OPPONENT && currentOpponentNames.includes(opp)) {
            facedPlayerOpponentsInR1toR6.push(opp);
        }
    }
    
    const distinctFacedPlayerOpponents = [...new Set(facedPlayerOpponentsInR1toR6)];
    const validPlayerNames = currentOpponentNames.filter(name => name && name.trim() !== '');

    if (validPlayerNames.length < 7) {
        return { opponent: null, message: "Pastikan nama 7 pemain lawan unik dan terisi semua." };
    }
    if (distinctFacedPlayerOpponents.length < 6 && ![...Array(6).keys()].every(i => currentYourHistory[i+1] !== null)) {
      let filledRounds1to6 = 0;
      for (let i = 1; i<=6; i++) {
        if (currentYourHistory[i] !== null) filledRounds1to6++;
      }
      if (filledRounds1to6 < 6) {
        return { opponent: null, message: "Harap tentukan semua lawan Anda dari Ronde 1 hingga Ronde 6 untuk menentukan lawan Ronde 7 secara akurat." };
      }
    }

    const unfacedOpponents = validPlayerNames.filter(opName => !distinctFacedPlayerOpponents.includes(opName));

    if (unfacedOpponents.length === 1) {
      return { opponent: unfacedOpponents[0], message: `Anda akan menghadapi ${unfacedOpponents[0]}, lawan terakhir yang belum dihadapi.` };
    } else if (unfacedOpponents.length > 1) {
      return { opponent: null, message: `Tidak dapat menentukan lawan terakhir yang belum dihadapi. ${unfacedOpponents.length} pemain belum dihadapi. Periksa riwayat pertandingan dan nama lawan Anda untuk konsistensi.` };
    } else {
      return { opponent: null, message: "Anda sepertinya telah menghadapi semua lawan berbeda berdasarkan data saat ini. Periksa riwayat pertandingan Anda." };
    }
  }, []);


  const handlePredict = useCallback(() => {
    let result: PredictionResult = { opponent: null, message: '', ruleApplied: null };

    const yourR1Opp = yourHistory[1];
    const yourR3Opp = yourHistory[3];

    if (predictForRound === 1 || predictForRound === 2 || predictForRound === 4) {
      result = { opponent: "Acak", message: "Lawan dipilih secara acak oleh sistem.", ruleApplied: "Penentuan Acak" };
    } else if (predictForRound === 3) {
      if (!yourR1Opp) {
        result.message = "Harap tentukan lawan Anda di Ronde 1.";
      } else if (!keyOpponentMatches.r1Opponent_vs_r2) {
        result.message = `Harap tentukan siapa yang dihadapi ${yourR1Opp} di Ronde 2.`;
      } else {
        result.opponent = keyOpponentMatches.r1Opponent_vs_r2;
        result.message = `Anda akan menghadapi ${result.opponent} (lawan dari musuh R1 Anda di R2).`;
        result.ruleApplied = "R3: Vs Lawan dari musuh R1 Anda di R2";
      }
    } else if (predictForRound === 5) {
      if (!yourR1Opp) {
        result.message = "Harap tentukan lawan Anda di Ronde 1.";
      } else if (!keyOpponentMatches.r1Opponent_vs_r4) {
        result.message = `Harap tentukan siapa yang dihadapi ${yourR1Opp} di Ronde 4.`;
      } else {
        result.opponent = keyOpponentMatches.r1Opponent_vs_r4;
        result.message = `Anda akan menghadapi ${result.opponent} (lawan dari musuh R1 Anda di R4).`;
        result.ruleApplied = "R5: Vs Lawan dari musuh R1 Anda di R4";
      }
    } else if (predictForRound === 6) {
      if (!yourR3Opp) {
        result.message = "Harap tentukan lawan Anda di Ronde 3.";
      } else if (!keyOpponentMatches.r3Opponent_vs_r5) {
        result.message = `Harap tentukan siapa yang dihadapi ${yourR3Opp} di Ronde 5.`;
      } else {
        result.opponent = keyOpponentMatches.r3Opponent_vs_r5;
        result.message = `Anda akan menghadapi ${result.opponent} (lawan dari musuh R3 Anda di R5).`;
        result.ruleApplied = "R6: Vs Lawan dari musuh R3 Anda di R5";
      }
    } else if (predictForRound === 7) {
      const r7Pred = calculateR7Prediction(opponentNames, yourHistory);
      result.opponent = r7Pred.opponent;
      result.message = r7Pred.message;
      if (r7Pred.opponent) result.ruleApplied = "R7: Lawan Terakhir Belum Dihadapi";
    } else if (predictForRound >= 8) {
      const cycleIndex = (predictForRound - 8) % 7; 
      const targetHistoryRound = cycleIndex + 1; 

      if (targetHistoryRound === 7) {
        const r7Pred = calculateR7Prediction(opponentNames, yourHistory);
        if (r7Pred.opponent) {
          result.opponent = r7Pred.opponent;
          result.message = `Siklus berulang: Anda akan menghadapi lawan prediksi Ronde 7 Anda, ${r7Pred.opponent}.`;
          result.ruleApplied = `R${predictForRound}: Siklus - Prediksi Lawan R7`;
        } else {
          result.message = `Tidak dapat menentukan lawan Ronde 7, yang dibutuhkan untuk siklus ini. ${r7Pred.message}`;
        }
      } else {
        const pastOpponent = yourHistory[targetHistoryRound];
        if (pastOpponent) {
          result.opponent = pastOpponent;
          result.message = `Siklus berulang: Anda akan menghadapi lawan Ronde ${targetHistoryRound} Anda, ${pastOpponent}.`;
          result.ruleApplied = `R${predictForRound}: Siklus - Lawan R${targetHistoryRound}`;
        } else {
          result.message = `Tidak dapat menentukan lawan Ronde ${targetHistoryRound} Anda, yang dibutuhkan untuk siklus ini. Harap isi riwayat pertandingan Anda untuk Ronde ${targetHistoryRound}.`;
        }
      }
    } else {
      result.message = "Logika prediksi untuk ronde ini tidak ditentukan.";
    }
    setPrediction(result);
  }, [predictForRound, opponentNames, yourHistory, keyOpponentMatches, calculateR7Prediction]);

  const handleResetData = useCallback(() => {
    setOpponentNames(initialOpponentNames);
    setYourHistory(initialYourHistory);
    setKeyOpponentMatches(initialKeyOpponentMatches);
    setPredictForRound(1);
    setPrediction({
      opponent: null,
      message: 'Data direset. Masukkan data baru dan pilih ronde untuk prediksi.',
      ruleApplied: null,
    });
  }, [initialOpponentNames, initialYourHistory, initialKeyOpponentMatches]);

  const uniqueOpponentNames = useMemo(() => {
    const names = opponentNames.map(name => name.trim()).filter(name => name !== '');
    return new Set(names).size === names.length;
  }, [opponentNames]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-4xl">
        <Header />
        
        <main className="space-y-8">
          <OpponentNameSetup 
            opponentNames={opponentNames} 
            onNameChange={handleOpponentNameChange}
            isUnique={uniqueOpponentNames}
          />
          
          <MatchDataInput
            opponentNames={opponentNames}
            yourHistory={yourHistory}
            onYourHistoryChange={handleYourHistoryChange}
            keyOpponentMatches={keyOpponentMatches}
            onKeyMatchChange={handleKeyMatchChange}
          />

          <PredictionControls
            predictForRound={predictForRound}
            onPredictForRoundChange={setPredictForRound}
            onPredict={handlePredict}
            onResetData={handleResetData}
            maxRound={MAX_PREDICTION_ROUND}
          />

          <PredictionResultDisplay prediction={prediction} />
          <RulesSummary />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
