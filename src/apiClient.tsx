import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";
const AUTH_ROUTE = "/auth";
const DOGS_ROUTE = "/dogs";
const LOCATION_ROUTE = "/location";

const URL_MAP = {
  login: `${AUTH_ROUTE}/login`,
  logout: `${AUTH_ROUTE}/logout`,
  fetchDogsById: `${DOGS_ROUTE}`,
  getBreeds: `${DOGS_ROUTE}/breeds`,
  searchDogs: `${DOGS_ROUTE}/search`,
  getUserMatch: `${DOGS_ROUTE}/match`,
  getLocations: `${LOCATION_ROUTE}`,
  searchLocations: `${LOCATION_ROUTE}/search`,
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface SearchParams {
  url?: string;
  breeds?: string[];
  sortField?: string;
}

const _login = (data = {}, config = {}) => {
  return apiClient.post(URL_MAP.login, data, {
    ...config,
    withCredentials: true,
  });
};

const _logout = (data = {}, config = {}) => {
  return apiClient.post(URL_MAP.logout, { body: data }, config);
};

const _getBreeds = (config = {}) => {
  return apiClient.get(URL_MAP.getBreeds, { ...config, withCredentials: true });
};

/**
 * Searches for dogs based on the provided search parameters.
 *
 * @param {SearchParams} data - The search parameters.
 * @param {Object} [config={}] - Optional configuration for the API request.
 * @param {string} [data.url] - The URL to use for the search request. Defaults to URL_MAP.searchDogs.
 * @param {string[]} [data.breeds] - An array of dog breeds to filter the search results.
 * @param {string} [data.sortField='asc'] - The field to sort the search results by. Defaults to 'asc'.
 * @returns {Promise} - A promise that resolves to the API response.
 */
const _searchDogs = (data: SearchParams, config = {}) => {
  const url = data.url || URL_MAP.searchDogs;
  const breeds = data.breeds;
  const sortField = data.sortField || 'asc'
  return apiClient.get(url, {
    ...config,
    withCredentials: true,
    params: {
      size: 12,
      sort: `breed:${sortField}`,
      ...(breeds && { breeds }),
    },
  });
};

/**
 * Fetches dogs by their ID.
 *
 * @param {Object} [data={}] - The data to be sent in the request body.
 * @param {Object} [config={}] - Additional configuration options for the request.
 * @returns {Promise} - A promise that resolves to the response of the API call.
 */
const _fetchDogsById = (data = {}, config = {}) => {
  return apiClient.post(URL_MAP.fetchDogsById, data, {
    ...config,
    withCredentials: true,
  });
};

/**
 * Fetches dog data based on the provided search parameters.
 *
 * @param {Object} params - The search parameters.
 * @param {string} params.url - The URL to fetch data from.
 * @param {string[]} params.breeds - The list of dog breeds to search for.
 * @param {string} params.sortField - The field to sort the results by.
 * @returns {Promise<{dogs: any, searchDogsResponse: any}>} An object containing the fetched dog data and the search response.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
const _getDogData = async ({
  url,
  breeds,
  sortField,
}: SearchParams) => {
  let dogs, searchDogsResponse;
  try {
    searchDogsResponse = await _searchDogs({ url, breeds, sortField });
    dogs = await _fetchDogsById(searchDogsResponse.data.resultIds);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(String(err));
    }
  } finally {
    const searchResponse = searchDogsResponse ? searchDogsResponse.data : {};
    const dogsData = dogs ? dogs.data : {};
    dogs = dogsData;
    searchDogsResponse = searchResponse;
  }
  return {
    dogs,
    searchDogsResponse,
  };
};

export { _login, _logout, _getBreeds, _searchDogs, _fetchDogsById, _getDogData };
