import { Dispatch } from 'redux';
import { Stats } from '../types/Stats';

export const UPDATE_CREW_STAT = 'UPDATE_CREW_STAT';

interface UpdateCrewStatAction {
  type: typeof UPDATE_CREW_STAT;
  payload: {
    stat: keyof Stats['crew'];
    value: number;
  };
}

export const updateCrewStat = (stat: keyof Stats['crew'], value: number): UpdateCrewStatAction => ({
  type: UPDATE_CREW_STAT,
  payload: { stat, value },
});

export type StatsActionTypes = UpdateCrewStatAction;