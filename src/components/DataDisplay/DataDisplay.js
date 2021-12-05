import React from 'react';

const DataDisplay = ({ antsData }) => {
  const prettyPrintData = () => {
    const displayElements = [];
    for(const ant of antsData) {
      displayElements.push(
        <div>
          <span>{`NAME: ${ant.name}`}</span><br/>
          <span>{`LENGTH: ${ant.length}`}</span><br/>
          <span>{`COLOR: ${ant.color}`}</span><br/>
          <span>{`WEIGHT: ${ant.weight}`}</span><br/><br/>
        </div>
      );
    }
    return displayElements;
  }

  return (
    <div>
      {prettyPrintData()}
    </div>
  )
};

export default DataDisplay;