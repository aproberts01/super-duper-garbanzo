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
  lastPage: number;
  selectedBreeds: string[];
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
  | { type: "HANDLE_PAGE_CHANGE"; payload: PageParams }
  | { type: "FILTER_BREEDS"; payload: string };

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
  lastPage: 0,
  selectedBreeds: [],
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
        lastPage: Math.ceil(action.payload.total / state.resultsPerPage),
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
        lastPage,
      } = state || {};

      const isNext = direction === "next";
      const isLastPage = page === lastPage;
      const isFirstPage = page === 1;
      const newPage = page ? page : currentPage;

      const isNextPaginationSet = () => {
        if (direction) {
          if (isNext) {
            console.log(page, paginationArray[paginationLength - 1] + 1)
            return page === paginationArray[paginationLength - 1] + 1;
          }
          return page === paginationArray[0] - 1;
        }
        return false;
      };

      //handle set of pagination controls
      const handlePaginationArray = (): number[] => {
        if (direction && isNextPaginationSet()) {
          return Array.from({ length: paginationLength }, (_, i) => {
            if (isNext) {
              return i + paginationStartNumber + paginationLength;
            }
            return i + paginationStartNumber - paginationLength;
          });
        }

        if (isLastPage) {
          return Array.from(
            { length: paginationLength },
            (_, i) => i + (lastPage + 1) - paginationLength
          );
        }

        if (isFirstPage) {
          return Array.from(
            { length: paginationLength },
            (_, i) => i + 1
          );
        }
        return paginationArray;
      };

      //handle first number in pagination set
      const handlePaginationStartNumber = (): number => {
        if (direction && isNextPaginationSet()) {
          if (direction === "next") {
            return paginationStartNumber + paginationLength;
          }
          return paginationStartNumber - paginationLength;
        }

        if (isLastPage) {
          return lastPage + 1 - paginationLength;
        }

        if (isFirstPage) {
          return 1
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
    case 'FILTER_BREEDS': {
      let breeds;
      if (state.selectedBreeds.includes(action.payload)) {
        breeds = [...state.selectedBreeds].filter((breed) => breed !== action.payload)
      } else {
        breeds = [...state.selectedBreeds, action.payload]
      }
      return {
        ...state,
        selectedBreeds: breeds,
        currentPage: 1,
        paginationArray: Array.from(
          { length: INITIAL_PAGINATION_LENGTH },
          (_, i) => i + 1
        ),
        paginationStartNumber: 1,
      }
    }
    default:
      return state;
  }
}
