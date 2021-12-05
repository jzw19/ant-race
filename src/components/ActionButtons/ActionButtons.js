import React from 'react';

import './ActionButtons.css';
export const ActionButtons = ({ displayData, startRace, toggleRoundResults }) => {
  return (
    <div>
      <div className='primaryButtons'>
        <button className='fetchAntsButton' onClick={displayData}>Fetch Ants</button>
        <button className='startRaceButton' onClick={startRace}>Start Race</button>
      </div>
      <div className='secondaryButtons'>
        <button className='roundingButton' onClick={toggleRoundResults}>Round results</button>
      </div>
    </div>
  );
}

export default ActionButtons;