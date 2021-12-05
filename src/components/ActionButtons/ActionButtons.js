import React from 'react';

import './ActionButtons.css';
export const ActionButtons = ({ displayData, startRace }) => {
  return (
    <div>
      <button className='fetchAntsButton' onClick={displayData}>Fetch Ants</button>
      <button className='startRaceButton' onClick={startRace}>Start Race</button>
    </div>
  );
}

export default ActionButtons;