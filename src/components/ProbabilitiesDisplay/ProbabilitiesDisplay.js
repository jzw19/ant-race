import React from 'react';
import PropTypes from 'prop-types';

import './ProbabilitiesDisplay.css';
const ProbabilitiesDisplay = ({
  antsData,
  probabilityData,
  hasRaceStarted,
  shouldRoundResults
}) => {
  const linkData = () => {
    const linkedData = [];
    for(let i = 0; i < antsData.length; i++) {
      linkedData.push({ name: antsData[i].name, probabilityOfWinning: probabilityData[i]});
    }
    return linkedData;
  }

  const prettyPrintProbabilityData = () => {
    let isRaceInProgress = false;
    const sortedData = linkData().sort((a, b) => {
      if(a.probabilityOfWinning === 'In progress') {
        isRaceInProgress = true;
        return 1;
      }
      return b.probabilityOfWinning - a.probabilityOfWinning;
    });

    const raceStatusLabel = 'Status of race: ';
    let raceStatusText;
    if(!hasRaceStarted) {
      raceStatusText = 'Not yet run';
    } else if(isRaceInProgress) {
      raceStatusText = 'In progress';
    } else {
      raceStatusText = 'All calculated';
    }

    const displayElements = [];

    displayElements.push(
      <tr className='raceTableColumnHeaders' key='status'>
        <td className={antsData.length ? '' : 'finalLeftCell'}>Contest'ant'</td>
        <td className={antsData.length ? '' : 'finalRightCell'}>Likelihood of winning</td>
      </tr>
    );

    for(let i = 0; i < sortedData.length; i++) {
      const key = `probability_${i}`;
      let probabilityToDisplay = sortedData[i].probabilityOfWinning;

      if(typeof probabilityToDisplay === 'number') {
        if(shouldRoundResults) {
          probabilityToDisplay = `${Math.round(probabilityToDisplay * 100)}%`;
        } else {
          probabilityToDisplay = `${probabilityToDisplay * 100}%`;
        }
      }
      
      if(i === sortedData.length - 1) {
        displayElements.push(
          <tr className='contestantProbability' key={key}>
            <td className='finalLeftCell'>{sortedData[i].name}</td>
            <td className='finalRightCell' data-testid='visibleProbability'>{probabilityToDisplay}</td>
          </tr>
        );
      } else {
        displayElements.push(
          <tr className='contestantProbability' key={key}>
            <td>{sortedData[i].name}</td>
            <td data-testid='visibleProbability'>{probabilityToDisplay}</td>
          </tr>
        );
      }
    }
    return (
      <table className='probabilitiesTable' cellPadding='5%' cellSpacing='0'>
        <thead>
          <tr>
            <th className='probabilitiesTableTitle' colSpan='2'>ANT RACE</th>
          </tr>
          <tr>
          <th colSpan='2'>{raceStatusLabel + raceStatusText}</th>
          </tr>
        </thead>
        <tbody>
          {displayElements}
        </tbody>
      </table>
    );
  }

  return (
    <div className='probabilityDisplayContainer'>
      {prettyPrintProbabilityData()}
    </div>
  )
};

ProbabilitiesDisplay.propTypes = {
  antsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      length: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired
    })
  ).isRequired,
  probabilityData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  hasRaceStarted: PropTypes.bool.isRequired,
  shouldRoundResults: PropTypes.bool
};

export default ProbabilitiesDisplay;