import React from 'react';
import PropTypes from 'prop-types';

import './ActionButtons.css';
export const ActionButtons = ({
  displayData,
  startRace,
  toggleRoundResults
}) => (
  <div>
    <div className='primaryButtons'>
      <button className='fetchAntsButton' onClick={displayData}>Fetch Ants</button>
      <button className='startRaceButton' onClick={startRace}>Start Race</button>
    </div>
    <div className='secondaryButtons'>
      <button className='roundingButton' onClick={toggleRoundResults}>Round Results</button>
    </div>
  </div>
);

ActionButtons.propTypes = {
  displayData: PropTypes.func,
  startRace: PropTypes.func,
  toggleRoundResults: PropTypes.func
};

export default ActionButtons;