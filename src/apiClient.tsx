import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";
const AUTH_ROUTE = "/auth";
const DOGS_ROUTE = "/dogs";
const LOCATION_ROUTE = "/location";

const URL_MAP = {
  login: `${AUTH_ROUTE}/login`,
  logout: `${AUTH_ROUTE}/logout`,
  getDogsById: `${DOGS_ROUTE}`,
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
  next?: string;
  prev?: string;
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

const _searchDogs = (data: SearchParams, config = {}) => {
  const url = data.next || data.prev || URL_MAP.searchDogs;
  return apiClient.get(url, {
    ...config,
    withCredentials: true,
    params: {
      size: 12,
    }
  });
};

const _getDogsById = (data = {}, config = {}) => {
    return apiClient.post(URL_MAP.getDogsById, data, {
        ...config,
        withCredentials: true,
    });
}


export { _login, _logout, _getBreeds, _searchDogs, _getDogsById };
