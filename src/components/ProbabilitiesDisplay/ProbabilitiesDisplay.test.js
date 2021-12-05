import { render, screen } from '@testing-library/react';
import ProbabilitiesDisplay from './ProbabilitiesDisplay';

describe('ProbabilitiesDisplay', () => {
  const mockProbability = 0.87654321;
  const mockProbabilityPercentage = '87.654321%';
  const mockProbabilityPercentageRounded = '88%';
  let props;

  beforeEach(() => {
    props = {
      antsData: [],
      probabilityData: [],
      hasRaceStarted: false,
      shouldRoundResults: false
    }
  });

  it('renders expected elements on initialization', () => {
    render(<ProbabilitiesDisplay {...props}/>);

    const tableTitle = screen.queryByText('ANT RACE');
    const statusOfRace = screen.queryByText('Status of race: Not yet run');
    const contestantColumnLabel = screen.queryByText("Contest'ant'");
    const probabilityColumnLabel = screen.queryByText('Likelihood of winning');

    expect(tableTitle).toBeInTheDocument();
    expect(statusOfRace).toBeInTheDocument();
    expect(contestantColumnLabel).toBeInTheDocument();
    expect(probabilityColumnLabel).toBeInTheDocument();
  });

  it('renders data when data is provided', () => {
    props = {
      ...props,
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'silver',
          length: 3,
          weight: 1
        }
      ],
      probabilityData: [
        mockProbability
      ]
    }
    render(<ProbabilitiesDisplay {...props}/>);

    const antName = screen.queryByText("Susan B. 'Ant'hony");
    const antProbability = screen.queryByText(`${mockProbabilityPercentage}`);

    expect(antName).toBeInTheDocument();
    expect(antProbability).toBeInTheDocument();
  });

  it('renders rounded data when data is provided and rounding has been toggled on', () => {
    props = {
      ...props,
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'silver',
          length: 3,
          weight: 1
        }
      ],
      probabilityData: [
        mockProbability
      ],
      shouldRoundResults: true
    }
    render(<ProbabilitiesDisplay {...props}/>);

    const antName = screen.queryByText("Susan B. 'Ant'hony");
    const antProbability = screen.queryByText(`${mockProbabilityPercentageRounded}`);

    expect(antName).toBeInTheDocument();
    expect(antProbability).toBeInTheDocument();
  });

  it('renders text to indicate the race is in progress after the race has started', () => {
    props = {
      ...props,
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'silver',
          length: 3,
          weight: 1
        },
        {
          name: "S'ant'a Claus",
          color: 'red',
          length: 4,
          weight: 8
        }
      ],
      probabilityData: [
        'In progress',
        'In progress'
      ],
      hasRaceStarted: true

    }
    render(<ProbabilitiesDisplay {...props}/>);

    const firstAntName = screen.queryByText("Susan B. 'Ant'hony");
    const inProgressStrings = screen.queryAllByText('In progress');

    expect(firstAntName).toBeInTheDocument();
    expect(inProgressStrings.length).toEqual(2);
  });

  it('renders text to indicate the race is done once all calculations have finished', () => {
    props = {
      ...props,
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'silver',
          length: 3,
          weight: 1
        }
      ],
      probabilityData: [
        mockProbability
      ],
      hasRaceStarted: true
    }
    render(<ProbabilitiesDisplay {...props}/>);

    const calculationsCompletedText = screen.queryByText('Status of race: All calculated');
    const probabilityText = screen.queryByText(`${mockProbabilityPercentage}`);

    expect(calculationsCompletedText).toBeInTheDocument();
    expect(probabilityText).toBeInTheDocument();
  });

  it('displays completed calculations in descending order', () => {
    props = {
      ...props,
      antsData: [
        {
          name: 'antClone',
          color: 'silver',
          length: 3,
          weight: 1
        },
        {
          name: 'antClone',
          color: 'red',
          length: 4,
          weight: 8
        },
        {
          name: 'antClone',
          color: 'black',
          length: 5,
          weight: 9
        }
      ],
      probabilityData: [
        0.555,
        0.123,
        0.987
      ],
      hasRaceStarted: true,
      shouldRoundResults: true
    }
    render(<ProbabilitiesDisplay {...props}/>);

    const displayedProbabilities = screen.queryAllByTestId('visibleProbability');
    const sortedProbabilities = ['99%', '56%', '12%'];
    
    for(let i = 0; i < displayedProbabilities.length; i++) {
      expect(displayedProbabilities[i].innerHTML).toEqual(sortedProbabilities[i]);
    }
  });
});