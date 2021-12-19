import React from 'react';
import PropTypes from 'prop-types';
import { ANT_IMAGES } from '../../util/constants';

import './ContestantsDisplay.css';
const ContestantsDisplay = ({ antsData }) => {
  const displayAntImage = (color) => {
    const altText = `${color} ant`;
    if(ANT_IMAGES[color]) {
      return <img className='antImage' alt={altText} src={ANT_IMAGES[color]} />
    }

    return <img className='antImage' alt='unknown color ant' src={ANT_IMAGES['unknown']} />;
  };

  const prettyPrintData = () => {
    const displayElements = [];
    let rowElements = [];

    for(let i = 0; i < antsData.length; i++) {
      if(i > 0 && i % 4 === 0) {
        displayElements.push(<tr key={`contestantRow_${Math.floor(i / 4)}`}>{rowElements}</tr>);
        rowElements = [];
      }

      const ant = antsData[i];
      rowElements.push(
        <td className='antData' key={`ant_${i}`}>
          <div className='profilePicture'>
            {displayAntImage(ant.color)}
          </div>
          <div className='profileData'>
            <span className='antName'>{ant.name}</span><br/>
            <span>{`Color: ${ant.color.toLowerCase()}`}</span><br/>
            <span>{`Length: ${ant.length}`}</span><br/>
            <span>{`Weight: ${ant.weight}`}</span><br/><br/>
          </div>
        </td>
      );
    }
    if(rowElements.length) {
      displayElements.push(<tr key={`contestantRow_${Math.floor(antsData.length / 4) + 1}`}>{rowElements}</tr>);
    }

    return (
      <table>
        <tbody>
          {displayElements}
        </tbody>
      </table>
    );
  };

  return (
    <div className='antDataContainer'>
      {prettyPrintData()}
    </div>
  );
};

ContestantsDisplay.propTypes = {
  antsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      length: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ContestantsDisplay;