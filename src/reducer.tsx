// Define state types
interface DataType {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

interface DogsType {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}

interface StateType {
  data: DataType;
  breeds: string[];
  dogs: DogsType[];
  resultsPerPage: number;
  currentPage: number;
  paginationArray: number[];
  paginationStartNumber: number;
  paginationLength: number;
}

interface PageParams {
  direction?: string;
  page?: number;
}

// Define action types
type ActionType =
  | { type: "SEARCH_DOGS"; payload: DataType }
  | { type: "GET_DOGS_BY_ID"; payload: DogsType[] }
  | { type: "ADD_BREEDS"; payload: string[] }
  | { type: "HANDLE_PAGE_CHANGE"; payload: PageParams };

const INITIAL_PAGINATION_LENGTH = 7;

// Initial state
export const initialState: StateType = {
  data: {
    resultIds: [],
    total: 0,
    next: "",
    prev: "",
  },
  breeds: [],
  dogs: [],
  resultsPerPage: 12,
  currentPage: 1,
  paginationArray: Array.from(
    { length: INITIAL_PAGINATION_LENGTH },
    (_, i) => i + 1
  ),
  paginationStartNumber: 1,
  paginationLength: INITIAL_PAGINATION_LENGTH,
};

// Reducer function
export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SEARCH_DOGS":
      return {
        ...state,
        data: {
          ...state.data,
          next: action.payload.next,
          prev: action.payload.prev,
          resultIds: action.payload.resultIds,
          total: action.payload.total,
        },
      };
    case "GET_DOGS_BY_ID":
      return {
        ...state,
        dogs: action.payload,
      };
    case "ADD_BREEDS":
      return {
        ...state,
        breeds: action.payload,
      };
    case "HANDLE_PAGE_CHANGE": {
      const { payload }: { payload: PageParams } = action || {};
      const { direction, page }: { direction?: string; page?: number } =
        payload || {};
      const {
        currentPage,
        paginationLength,
        paginationStartNumber,
        paginationArray,
      } = state || {};

      const isNext = direction === "next";
      const isNextPaginationSet = isNext
        ? currentPage % paginationLength === 0
        : (currentPage - 1) % paginationLength === 0;

      //handle page change
      let newPage = currentPage;
      if (direction) {
        newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
      } else if (page) {
        newPage = page;
      }

      //handle set of pagination controls
      const handlePaginationArray = (): number[] => {
        if (isNextPaginationSet && !page) {
          return Array.from({ length: paginationLength }, (_, i) => {
            if (direction === "next") {
              return i + paginationStartNumber + paginationLength;
            }
            return i + paginationStartNumber - paginationLength;
          });
        }
        return paginationArray;
      };

      //handle first number in pagination set
      const handlePaginationStartNumber = (): number => {
        if (isNextPaginationSet && !page) {
          if (direction === "next") {
            return paginationStartNumber + paginationLength;
          }
          return paginationStartNumber - paginationLength;
        }
        return paginationStartNumber;
      };

      return {
        ...state,
        currentPage: newPage,
        paginationArray: handlePaginationArray(),
        paginationStartNumber: handlePaginationStartNumber(),
      };
    }
    default:
      return state;
  }
}
