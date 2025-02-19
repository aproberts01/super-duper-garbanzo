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
      //todo: refactor this to be more readable
      const isNext = action.payload.direction === "next";
      const newPage = isNext ? state.currentPage + 1 : state.currentPage - 1;
      const isNextPaginationSet = isNext
        ? state.currentPage % state.paginationLength === 0
        : (state.currentPage - 1) % state.paginationLength === 0;
      const pageChange = (i: number) =>
        i +
        (isNext
          ? state.paginationStartNumber + state.paginationLength
          : state.paginationStartNumber - state.paginationLength);
      return {
        ...state,
        currentPage: action.payload.direction
          ? newPage
          : action.payload.page ?? state.currentPage,
        paginationArray:
          isNextPaginationSet && !action.payload.page
            ? Array.from({ length: state.paginationLength }, (_, i) =>
                pageChange(i)
              )
            : state.paginationArray,
        paginationStartNumber:
          isNextPaginationSet && !action.payload.page
            ? isNext
              ? state.paginationStartNumber + state.paginationLength
              : state.paginationStartNumber - state.paginationLength
            : state.paginationStartNumber,
      };
    }
    default:
      return state;
  }
}
