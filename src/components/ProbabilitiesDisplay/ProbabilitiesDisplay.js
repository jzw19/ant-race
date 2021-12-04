import React from 'react';

const ProbabilitiesDisplay = ({ antsData, probabilityData }) => {
  const linkData = () => {
    const linkedData = [];
    for(let i = 0; i < antsData.length; i++) {
      linkedData.push({ name: antsData[i].name, probabilityOfWinning: probabilityData[i]});
    }
    return linkedData;
  }

  const prettyPrintProbabilityData = () => {
    const sortedData = linkData().sort((a, b) => {
      if(typeof a.probabilityOfWinning === 'string') {
        return 1;
      }
      return b.probabilityOfWinning - a.probabilityOfWinning;
    });
    const displayElements = [];

    for(const entry of sortedData) {
      displayElements.push(
      <div>
        <span>{entry.name}: {entry.probabilityOfWinning}</span>
        <br/>
      </div>)
    }
    return displayElements;
  }

  return (
    <div>
      {prettyPrintProbabilityData()}
    </div>
  )
};

export default ProbabilitiesDisplay;