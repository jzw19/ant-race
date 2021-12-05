import React from 'react';

import './ProbabilitiesDisplay.css';
const ProbabilitiesDisplay = ({ antsData, probabilityData, hasRaceStarted, shouldRoundResults }) => {
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
        <td>Contest'ant'</td>
        <td>Likelihood of winning</td>
      </tr>
    );

    let i = 0;
    for(const entry of sortedData) {
      const key = `probability_${i}`;
      i++;
      let probabilityToDisplay = entry.probabilityOfWinning;
      if(typeof probabilityToDisplay === 'number') {
        if(shouldRoundResults) {
          probabilityToDisplay = `${Math.round(probabilityToDisplay * 100)}%`;
        } else {
          probabilityToDisplay = `${probabilityToDisplay * 100}%`;
        }
      }
      displayElements.push(
      <tr className='contestantProbability' key={key}>
        <td>{entry.name}</td>
        <td data-testid='visibleProbability'>{probabilityToDisplay}</td>
      </tr>)
    }
    return (
      <table className='probabilitiesTable' cellPadding='5%' cellSpacing='0'>
        <thead>
          <tr>
            <th colSpan='2'>ANT RACE</th>
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

export default ProbabilitiesDisplay;