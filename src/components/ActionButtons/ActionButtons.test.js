import { render, screen } from '@testing-library/react';
import ActionButtons from './ActionButtons';

describe('ActionButtons', () => {
  let props;

  beforeEach(() => {
    props = {
      displayData: jest.fn(),
      startRace: jest.fn(),
      toggleRoundResults: jest.fn()
    }
  });

  it('renders expected elements on initialization', () => {
    render(<ActionButtons {...props}/>);

    const fetchAntsButton = screen.queryByText('Fetch Ants');
    const startRaceButton = screen.queryByText('Start Race');
    const roundResultsButton = screen.queryByText('Round Results');

    expect(fetchAntsButton).toBeInTheDocument();
    expect(startRaceButton).toBeInTheDocument();
    expect(roundResultsButton).toBeInTheDocument();
  });

  it('calls appropriate functions from props when buttons are clicked', () => {
    render(<ActionButtons {...props}/>);

    const fetchAntsButton = screen.queryByText('Fetch Ants');
    const startRaceButton = screen.queryByText('Start Race');
    const roundResultsButton = screen.queryByText('Round Results');

    fetchAntsButton.click();
    fetchAntsButton.click();
    fetchAntsButton.click();

    startRaceButton.click();
    startRaceButton.click();

    roundResultsButton.click()

    expect(props.displayData).toHaveBeenCalledTimes(3);
    expect(props.startRace).toHaveBeenCalledTimes(2);
    expect(props.toggleRoundResults).toHaveBeenCalledTimes(1);
  });
});