import React from 'react';
import BlackAnt from '../../img/ants/ant-black.jpg';
import RedAnt from '../../img/ants/ant-red.jpg';
import GreyAnt from '../../img/ants/ant-grey.jpg';

import './ContestantsDisplay.css';
const ContestantsDisplay = ({ antsData }) => {
  const displayAntImage = (color) => {
    switch(color.toLowerCase()) {
      case 'grey':
      case 'gray':
      case 'silver':
        return <img className='antImage' alt='grey ant' src={GreyAnt} />
      case 'red':
        return <img className='antImage' alt='red ant' src={RedAnt} />
      default:
        return <img className='antImage' alt='black ant' src={BlackAnt} />
    }
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

export default ContestantsDisplay;