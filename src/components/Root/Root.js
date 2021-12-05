import React, { Component } from 'react';

import ActionButtons from "../ActionButtons/ActionButtons";
import ContestantsDisplay from "../ContestantsDisplay/ContestantsDisplay";
import ProbabilitiesDisplay from "../ProbabilitiesDisplay/ProbabilitiesDisplay";

import api from "../../util/api";
import generateAntWinLikelihoodCalculator from "../../util/helpers";

import './Root.css';
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      antsData: [],
      probabilityData: [],
      hasRaceStarted: false,
      shouldRoundResults: false
    }

    this.displayAntsData = this.displayAntsData.bind(this);
    this.fetchAntWinLikelihood = this.fetchAntWinLikelihood.bind(this);
    this.startRace = this.startRace.bind(this);
    this.toggleRoundResults = this.toggleRoundResults.bind(this);
  }

  displayAntsData() {
    api.fetchAnts().then((response) => {
      const nextProbabilityData = [];
      response.data.ants.forEach(() => nextProbabilityData.push('Not yet run'));
      this.setState({
        antsData: response.data.ants,
        probabilityData: nextProbabilityData
      });
    });
  }

  fetchAntWinLikelihood(index) {
    return new Promise(generateAntWinLikelihoodCalculator()).then((resolved) => {
      const nextProbabilityData = this.state.probabilityData.slice();
      nextProbabilityData[index] = resolved;
      this.setState({
        ...this.state,
        probabilityData: nextProbabilityData
      });
    });
  }

  startRace() {
    const nextProbabilityData = this.state.probabilityData.slice();
    for(let i = 0; i < this.state.antsData.length; i++) {
      this.fetchAntWinLikelihood(i);
      nextProbabilityData[i] = 'In progress';
    }
    this.setState({
      ...this.state,
      probabilityData: nextProbabilityData,
      hasRaceStarted: true
    });
  }

  toggleRoundResults() {
    this.setState({
      ...this.state,
      shouldRoundResults: !this.state.shouldRoundResults
    });
  }

  render() {
    return (
      <div className='root'>
        <span className='contestantsTitle'>CONTEST'ANTS'</span>
        <ContestantsDisplay antsData={this.state.antsData}/>
        <ProbabilitiesDisplay
          antsData={this.state.antsData}
          probabilityData={this.state.probabilityData}
          hasRaceStarted={this.state.hasRaceStarted}
          shouldRoundResults={this.state.shouldRoundResults}
        />
        <ActionButtons
          displayData={this.displayAntsData}
          startRace={this.startRace}
          toggleRoundResults={this.toggleRoundResults}
        />
      </div>
    );
  }
}

export default Root;