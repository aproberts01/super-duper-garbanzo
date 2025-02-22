// Define state types
export interface DataType {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface DogsType {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}

export interface StateType {
  data: DataType;
  breeds: string[];
  dogs: DogsType[];
  resultsPerPage: number;
  currentPage: number;
  paginationArray: number[];
  paginationStartNumber: number;
  paginationLength: number;
  lastPage: number;
  selectedBreeds: string[];
  sortField: string;
}

export interface PageParams {
  direction?: string;
  page?: number;
}

// Define action types
export type ActionType =
  | {
      type: "SEARCH_DOGS";
      payload: { searchData: DataType; dogsData: DogsType[] };
    }
  | { type: "ADD_BREEDS"; payload: string[] }
  | { type: "HANDLE_PAGE_CHANGE"; payload: PageParams }
  | { type: "FILTER_BREEDS"; payload: string }
  | { type: "HANDLE_SORT" };
