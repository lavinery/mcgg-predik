
export interface PredictionResult {
  opponent: string | null;
  message: string;
  ruleApplied: string | null;
}

export const NPC_OPPONENT = "NPC/Ronde Monster";
export const NOT_SET_OPPONENT = ""; // Represents an unselected/empty value in dropdowns

export const MAX_PREDICTION_ROUND = 20; // Max round user can select for prediction

export type KeyOpponentMatchKey = 
  | 'r1Opponent_vs_r2' 
  | 'r1Opponent_vs_r4' 
  | 'r3Opponent_vs_r5';

export interface KeyOpponentMatches {
  r1Opponent_vs_r2: string | null;
  r1Opponent_vs_r4: string | null;
  r3Opponent_vs_r5: string | null;
}

export type YourHistory = Record<number, string | null>;