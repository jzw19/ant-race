import { render, screen } from '@testing-library/react';
import Root from './Root';
import { api } from '../../util/api';

jest.mock('../../util/api');
describe('Root', () => {
  beforeEach(() => {
    api.fetchAnts.mockReturnValue(
      new Promise(() => ({
          data: {
            ants: {
              name: "Susan B. 'Ant'hony",
              color: 'silver',
              length: 20,
              weight: 42
            }
          }
        })
      )
    );
  });
  
  it('renders expected elements on initialization', () => {
    render(<Root />);

    const title = screen.queryByText("CONTEST'ANTS'");
    const tableTitle = screen.queryByText('ANT RACE');
    const statusOfRace = screen.queryByText('Status of race: Not yet run');
    const contestantColumnLabel = screen.queryByText("Contest'ant'");
    const probabilityColumnLabel = screen.queryByText('Likelihood of winning');

    expect(title).toBeInTheDocument();
    expect(tableTitle).toBeInTheDocument();
    expect(statusOfRace).toBeInTheDocument();
    expect(contestantColumnLabel).toBeInTheDocument();
    expect(probabilityColumnLabel).toBeInTheDocument();
  });

  it('make GET request for ant data when user clicks the button to fetch ant data', () => {
    render(<Root />);

    const fetchAntDataButton = screen.queryByText('Fetch Ants');
    
    fetchAntDataButton.click();

    expect(api.fetchAnts).toHaveBeenCalled();
  });

  it('given the user has fetched ant data, when the user clicks the button to start the race and the race finishes, then the app displays text to indicate that calculations are done', () => {
    render(<Root />);

    const fetchAntDataButton = screen.queryByText('Fetch Ants');
    const startRaceButton = screen.queryByText('Start Race');
    const roundResultsButton = screen.queryByText('Round Results');

    fetchAntDataButton.click();
    startRaceButton.click();
    roundResultsButton.click();

    const doneText = screen.queryByText('Status of race: All calculated');

    expect(api.fetchAnts).toHaveBeenCalled();
    expect(doneText).toBeInTheDocument();
  });
});