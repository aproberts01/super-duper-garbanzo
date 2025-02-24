import { useCallback, useEffect, useReducer, useRef } from "react";
import { _getBreeds, _getDogData } from "./apiClient";
import { reducer, initialState } from "./reducer";
import { StateType, ActionType } from "./types";

/**
 * Custom hook that enhances the useReducer hook with middleware functionality.
 *
 * @param reducer - A function that takes the current state and an action, and returns the new state.
 * @param initialState - The initial state value.
 * @param afterwareFn - A function that is called after the state has been updated. It receives the dispatched action and the new state as arguments.
 *
 * @returns A tuple containing the current state and a dispatch function that supports middleware.
 *
 * @template StateType - The type of the state.
 * @template ActionType - The type of the actions that can be dispatched.
 */
const useReducerWithMiddleware = (
  reducer: (state: StateType, action: ActionType) => StateType,
  initialState: StateType,
  afterwareFn: (action: { type: string; payload?: unknown }, state: typeof initialState) => void
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const aRef = useRef<{ type: string; payload?: unknown } | null>(null);

  const dispatchWithMiddleware = (action: ActionType | null) => {
    aRef.current = action;
    if (action) {
      dispatch(action);
    }
  };

  useEffect(() => {
    if (!aRef.current) return;
      afterwareFn(aRef.current, state)

    aRef.current = null;
  }, [afterwareFn, state]);

  return [state, dispatchWithMiddleware as (action: ActionType | null) => void] as [StateType, (action: ActionType | null) => void];
};

/**
 * Custom hook to manage fetching and state for dog data.
 *
 * @returns {Object} - The state and handlers for managing dog data.
 * @returns {StateType} state - The current state of the dog data.
 * @returns {Function} handlePageChange - Handler to change the page of dog data.
 * @returns {Function} handleFilterBreeds - Handler to filter dog breeds.
 * @returns {Function} handleSort - Handler to sort dog data.
 */
export const useCustomFetch = () => {
  const afterDispatch = (cb: { type: string; payload?: unknown }, state: StateType) => {
    const { type } = cb;
    if (type === "HANDLE_SORT" || type === "FILTER_BREEDS") {
      getDogData({
        url: "",
        breeds: state.selectedBreeds,
        sortField: state.sortField,
      });
    }
  };
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    initialState,
    afterDispatch
  );

  interface GetDogDataParams {
    url: string;
    breeds?: string[];
    sortField?: string;
  }

  const getDogData = useCallback(
    async ({ url, breeds, sortField }: GetDogDataParams): Promise<void> => {
      try {
        const data = await _getDogData({ url, breeds, sortField });
        const { dogs, searchDogsResponse } = data;
        dispatch({
          type: "SEARCH_DOGS",
          payload: { searchData: searchDogsResponse, dogsData: dogs },
        });
      } catch (error) {
        console.error("Failed to fetch dog data:", error);
      }
    },
    [dispatch]
  );

  const getBreeds = useCallback(async (): Promise<void> => {
    try {
      const breeds = await _getBreeds();
      dispatch({ type: "ADD_BREEDS", payload: breeds?.data });
    } catch (error) {
      console.error("Failed to fetch breeds:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!state.dogs || state.dogs.length === 0) {
      getDogData({ url: "" });
    }

    if (!state.breeds || state.breeds.length === 0) {
      getBreeds();
    }
  }, [state.dogs, state.breeds, getDogData, getBreeds]);

  const handlePageChange = ({
    direction,
    page,
  }: {
    direction?: string;
    page?: number;
  }): void => {
    let url;
    if (direction) {
      url = direction === "next" ? state.data.next : state.data.prev;
    }
    if (page) {
      url = `/dogs/search?size=12&from=${state.paginationLength * page}`;
    }
    dispatch({
      type: "HANDLE_PAGE_CHANGE",
      payload: { ...(direction && { direction }), ...(page && { page }) },
    });
    getDogData({ url: url || "", breeds: state.selectedBreeds });
  };

  const handleFilterBreeds = (breed: string): void => {
    dispatch({
      type: "FILTER_BREEDS",
      payload: breed,
    });
  };

  const handleSort = (): void => {
    dispatch({
      type: "HANDLE_SORT",
    });
  };

  return {
    state,
    handlePageChange,
    handleFilterBreeds,
    handleSort,
  };
};
