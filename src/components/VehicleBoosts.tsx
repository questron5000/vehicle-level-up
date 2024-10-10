import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStats } from '../types/Stats';
import { updateVehicleStat } from '../actions/statsActions';

const VehicleBoosts: React.FC = () => {
  const stats = useSelector(getStats);
  const dispatch = useDispatch();

  const handleBoost = (stat: keyof typeof stats.vehicle) => {
    dispatch(updateVehicleStat(stat, stats.vehicle[stat] + 1));
  };

  return (
    <div>
      <button onClick={() => handleBoost('gasTank')}>Boost Gas Tank</button>
      <button onClick={() => handleBoost('powerTuning')}>Boost Power Tuning</button>
    </div>
  );
};

export default VehicleBoosts;