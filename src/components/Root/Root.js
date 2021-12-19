import React, { useState, useEffect } from 'react';

import ActionButtons from "../ActionButtons/ActionButtons";
import ContestantsDisplay from "../ContestantsDisplay/ContestantsDisplay";
import ProbabilitiesDisplay from "../ProbabilitiesDisplay/ProbabilitiesDisplay";

import api from "../../util/api";
import generateAntWinLikelihoodCalculator from "../../util/helpers";

import './Root.css';
export const Root = () => {
  const [antsData, setAntsData] = useState([]);
  const [hasRaceStarted, setHasRaceStarted] = useState(false);
  const [shouldRoundResults, setShouldRoundResults] = useState(false);

  const [probabilityData, setProbabilityData] = useState([]);
  const [updatedDataEntry, setUpdatedDataEntry] = useState([-1, -1]); // [index, value]

  useEffect(() => {
    const updatedProbabilityData = [...probabilityData];
    updatedProbabilityData[updatedDataEntry[0]] = updatedDataEntry[1];
    setProbabilityData(updatedProbabilityData);
  }, [updatedDataEntry]);

  const displayAntsData = () => {
    api.fetchAnts().then((response) => {
      const nextProbabilityData = [];
      response.data.ants.forEach(() => nextProbabilityData.push('Not yet run'));
      setAntsData(response.data.ants);
      setProbabilityData(nextProbabilityData);
    });
  }

  const fetchAntWinLikelihood = (index) => {
    return new Promise(generateAntWinLikelihoodCalculator()).then((resolved) => {
      setUpdatedDataEntry([index, resolved]);
    });
  }

  const startRace = () => {
    const nextProbabilityData = probabilityData.slice();
    for(let i = 0; i < antsData.length; i++) {
      fetchAntWinLikelihood(i);
      nextProbabilityData[i] = 'In progress';
    }
    setProbabilityData(nextProbabilityData);
    setHasRaceStarted(true);
  }

  const toggleRoundResults = () => {
    setShouldRoundResults(!shouldRoundResults);
  }

  return (
    <div className='root'>
      <span className='contestantsTitle'>CONTEST'ANTS'</span>
      <ContestantsDisplay antsData={antsData}/>
      <ProbabilitiesDisplay
        antsData={antsData}
        probabilityData={probabilityData}
        hasRaceStarted={hasRaceStarted}
        shouldRoundResults={shouldRoundResults}
      />
      <ActionButtons
        displayData={displayAntsData}
        startRace={startRace}
        toggleRoundResults={toggleRoundResults}
      />
    </div>
  );
}

export default Root;