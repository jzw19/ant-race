import { render, screen } from '@testing-library/react';
import ContestantsDisplay from './ContestantsDisplay';

describe('ContestantsDisplay', () => {
  let props;
  beforeEach(() => {
    props = {
      antsData: []
    }
  });

  it('does not render any visible elements when there is no data provided', () => {
    render(<ContestantsDisplay {...props}/>);

    const tableTitle = screen.queryByText("Susan B. Ant'hony");

    expect(tableTitle).not.toBeInTheDocument();
  });

  it('renders expected elements when an ant is provided', () => {
    props = {
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'gray',
          length: 2,
          weight: 3
        }
      ]
    }
    render(<ContestantsDisplay {...props} />);

    const antImage = screen.queryByAltText('grey ant');
    const antName = screen.queryByText("Susan B. 'Ant'hony");
    const antColor = screen.queryByText('Color: gray');
    const antLength = screen.queryByText('Length: 2');
    const antWeight = screen.queryByText('Weight: 3');

    expect(antImage).toBeInTheDocument();
    expect(antName).toBeInTheDocument();
    expect(antColor).toBeInTheDocument();
    expect(antLength).toBeInTheDocument();
    expect(antWeight).toBeInTheDocument();
  });

  it('renders expected images when grey, gray or silver ant is provided', () => {
    props = {
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'gray',
          length: 2,
          weight: 3
        },
        {
          name: "Fanc-E P'ants'",
          color: 'grey',
          length: 3,
          weight: 4
        },
        {
          name: "Silver Pend'ant'",
          color: 'silver',
          length: 4,
          weight: 5
        },
        {
          name: "Gr'ant' Ward",
          color: 'gray',
          length: 5,
          weight: 6
        },
        {
          name: "Defend'ant'",
          color: 'grey',
          length: 6,
          weight: 7
        }
      ]
    }
    render(<ContestantsDisplay {...props} />);

    const greyAntImages = screen.queryAllByAltText('grey ant');

    expect(greyAntImages.length).toEqual(5);
  });

  it('renders expected images when red ant is provided', () => {
    props = {
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'red',
          length: 2,
          weight: 3
        }
      ]
    }
    render(<ContestantsDisplay {...props} />);

    const redAntImages = screen.queryAllByAltText('red ant');

    expect(redAntImages.length).toEqual(1);
  });

  it('renders expected images when black ant is provided', () => {
    props = {
      antsData: [
        {
          name: "Susan B. 'Ant'hony",
          color: 'black',
          length: 2,
          weight: 3
        }
      ]
    }
    render(<ContestantsDisplay {...props} />);

    const blackAntImages = screen.queryAllByAltText('black ant');

    expect(blackAntImages.length).toEqual(1);
  });
});