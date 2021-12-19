// This file does not make calls to an actual API right now because I have not set up an API.
// Instead, I am randomizing the results and mocking the response we would expect to get.

import { AVAILABLE_COLORS, MAX_ANT_COUNT, MAX_ANT_LENGTH, MAX_ANT_WEIGHT } from "./constants";

const generateAnts = async () => {
  let antData = [];
  const antCount = Math.floor(Math.random() * MAX_ANT_COUNT + 1);

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