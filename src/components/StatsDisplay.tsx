import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getStats, Stats } from '../types/Stats';
import metalBuildingTexture from '../images/textures/metal-building.jpg';
import metalPaintedTexture from '../images/textures/metal-painted.jpg';
import VehicleBoosts from './VehicleBoosts';
import CrewBoosts from './CrewBoosts';

const StatsDisplay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicle' | 'crew'>('vehicle');
  const stats = useSelector(getStats);

  const containerStyle = (texture: string) => ({
    backgroundImage: `url(${texture})`,
    backgroundSize: 'cover',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    textShadow: '1px 1px 2px black',
  });

  const renderVehicleStats = () => (
    <div style={containerStyle(metalBuildingTexture)}>
      <h2>Vehicle Stats</h2>
      <p>Gas Tank: {stats.vehicle.gasTank}</p>
      <p>Power Tuning: {stats.vehicle.powerTuning}</p>
      <VehicleBoosts />
    </div>
  );

  const renderCrewStats = () => (
    <div style={containerStyle(metalPaintedTexture)}>
      <h2>Crew Stats</h2>
      <p>Blackjack: {stats.crew.blackjack}</p>
      <p>Anon: {stats.crew.anon}</p>
      <p>Rizz: {stats.crew.rizz}</p>
      <p>Pockets: {stats.crew.pockets}</p>
      <CrewBoosts />
    </div>
  );

  const buttonStyle = (isActive: boolean) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#444' : '#222',
    color: 'white',
    padding: '0.5rem 1rem',
    margin: '0 0.5rem',
    border: '1px solid #666',
    borderRadius: '4px',
    cursor: 'pointer',
  });

  return (
    <div style={{ backgroundColor: '#111', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('vehicle')}
          style={buttonStyle(activeTab === 'vehicle')}
        >
          Vehicle
        </button>
        <button 
          onClick={() => setActiveTab('crew')}
          style={buttonStyle(activeTab === 'crew')}
        >
          Crew
        </button>
      </div>
      {activeTab === 'vehicle' ? renderVehicleStats() : renderCrewStats()}
    </div>
  );
};

export default StatsDisplay;