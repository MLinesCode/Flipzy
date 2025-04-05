// Global variables to store cached animal data and track ongoing requests
let cachedAnimals = null;
let fetchPromise = null;

/**
 * Gets animal data from the API.
 * Uses a simple cache to avoid duplicate network calls during the session.
 *
 * @returns {Promise<Array<{id: string, name: string, image: string}>>} A promise resolving to an array of animal objects.
 */
export const fetchAnimals = async () => {
  // API endpoint – consider moving this to a config file for more flexibility
  const API_URL = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

  // Return cached data if available
  if (cachedAnimals) {
    return cachedAnimals;
  }

  // If a fetch is already in progress, return its promise
  if (fetchPromise) {
    return fetchPromise;
  }

  // Start a new fetch request and store the promise
  fetchPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        // Throw an error so it can be handled by the caller
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Map the entries to the format { id, name, image }
      const animals = data.entries.map((entry) => ({
        id: entry.meta.uuid,
        name: entry.meta.name,
        image: entry.fields.image.url,
      }));

      // Save the result for future calls during this session
      cachedAnimals = animals;

      resolve(animals);
    } catch (error) {
      console.error('Error fetching animals:', error);
      // Clear the ongoing request so we can try again later
      fetchPromise = null;
      reject(error);
    }
  });

  return fetchPromise;
};

/**
 * Resets the cached animal data and ongoing fetch promise.
 * Use this to refresh the data or during testing.
 */
export const clearAnimalCache = () => {
  cachedAnimals = null;
  fetchPromise = null;
  // Optional: uncomment the line below for debugging
  // console.log('Animal cache cleared');
};
