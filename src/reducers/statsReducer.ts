import { Stats, initialStats } from '../types/Stats';

const statsReducer = (state: Stats = initialStats, action: any): Stats => {
  switch (action.type) {
    case 'UPDATE_VEHICLE_STAT':
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          [action.payload.stat]: action.payload.value,
        },
      };
    case 'UPDATE_CREW_STAT':
      return {
        ...state,
        crew: {
          ...state.crew,
          [action.payload.stat]: action.payload.value,
        },
      };
    // Handle other cases...
    default:
      return state;
  }
};

export default statsReducer;