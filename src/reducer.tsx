import { StateType, ActionType, DataType, DogsType, PageParams } from "./types";

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
  sortField: 'asc',
};

// Reducer function
export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SEARCH_DOGS": {
      const { searchData, dogsData } : { searchData: DataType, dogsData: DogsType[] } = action.payload || {};
      const { total } = searchData
      return {
        ...state,
        data: searchData,
        dogs: dogsData,
        lastPage: Math.ceil(total / state.resultsPerPage),
      };
    }
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
    case 'HANDLE_SORT': {
      return {
        ...state,
        sortField: state.sortField === 'asc' ? 'desc' : 'asc',
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
