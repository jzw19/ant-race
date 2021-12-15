import { AVAILABLE_COLORS, MAX_ANT_COUNT, MAX_ANT_LENGTH, MAX_ANT_WEIGHT } from "./constants";

// Normally, his function would exist in the backend and I would
// call the API from here to get the generated ant data, but for
// now I am only creating a standalone SPA
const generateAnts = async () => {
  let antData = [];
  const antCount = Math.floor(Math.random() * MAX_ANT_COUNT + 1);
  console.log(AVAILABLE_COLORS)

  for(let i = 0; i < antCount; i++) {
    antData.push({
      name: `ANT-${i}`,
      color: AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)],
      length: Math.floor(Math.random() * MAX_ANT_LENGTH + 1),
      weight: Math.floor(Math.random() * MAX_ANT_WEIGHT + 1)
    });
  }

  return Promise.resolve({
    data: {
      ants: antData
    }
  });
}

export const api = {
  fetchAnts: () => generateAnts()
};

export default api;