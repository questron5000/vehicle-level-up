export interface VehicleStats {
  gasTank: number;
  powerTuning: number;
}

export interface CrewStats {
  blackjack: number;
  anon: number;
  rizz: number;
  pockets: number;
}

export interface Stats {
  vehicle: VehicleStats;
  crew: CrewStats;
  // Other existing stats...
}

// Update the initialStats object
export const initialStats: Stats = {
  vehicle: {
    gasTank: 0,
    powerTuning: 0,
  },
  crew: {
    blackjack: 0,
    anon: 0,
    rizz: 0,
    pockets: 0,
  },
  // Other existing stats...
};

// Update the getStats function
export function getStats(state: RootState): Stats {
  return state.stats;
}

// Update other relevant functions to use the new structure