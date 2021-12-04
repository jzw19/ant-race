import React, { Component } from 'react';

import ActionButtons from "../ActionButtons/ActionButtons";
import DataDisplay from "../DataDisplay/DataDisplay";
import ProbabilitiesDisplay from "../ProbabilitiesDisplay/ProbabilitiesDisplay";

import api from "../../util/api";
import generateAntWinLikelihoodCalculator from "../../util/helpers";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      antsData: [],
      probabilityData: []
    }

    this.displayAntsData = this.displayAntsData.bind(this);
    this.fetchAntWinLikelihood = this.fetchAntWinLikelihood.bind(this);
    this.startRace = this.startRace.bind(this);
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
      console.log(resolved);
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
      nextProbabilityData[i] = 'Loading...';
    }
    this.setState({
      ...this.state,
      probabilityData: nextProbabilityData
    });
  }

  render() {
    return (
      <div className='root'>
        <ActionButtons displayData={this.displayAntsData} startRace={this.startRace}/>
        <DataDisplay antsData={this.state.antsData}/>
        <ProbabilitiesDisplay antsData={this.state.antsData} probabilityData={this.state.probabilityData}/>
      </div>
    );
  }
}

export default Root;