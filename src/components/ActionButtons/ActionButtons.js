

export const ActionButtons = ({ displayData, startRace }) => {
  return (
    <div>
      <button onClick={displayData}>Fetch Ants</button>
      <button onClick={startRace}>Start Race</button>
    </div>
  );
}

export default ActionButtons;