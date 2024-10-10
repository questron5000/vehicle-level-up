import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStats } from '../types/Stats';
import { updateCrewStat } from '../actions/statsActions';

const CrewBoosts: React.FC = () => {
  const stats = useSelector(getStats);
  const dispatch = useDispatch();

  const handleBoost = (stat: keyof typeof stats.crew) => {
    dispatch(updateCrewStat(stat, stats.crew[stat] + 1));
  };

  return (
    <div>
      <button onClick={() => handleBoost('blackjack')}>Boost Blackjack</button>
      <button onClick={() => handleBoost('anon')}>Boost Anon</button>
      <button onClick={() => handleBoost('rizz')}>Boost Rizz</button>
      <button onClick={() => handleBoost('pockets')}>Boost Pockets</button>
    </div>
  );
};

export default CrewBoosts;