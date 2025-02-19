import { useCallback, useEffect, useReducer } from "react";
import { _searchDogs, _getDogsById, _getBreeds } from "./apiClient";
import { reducer, initialState } from "./reducer";

export const useCustomFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDogData = useCallback(async (nextUrl: string): Promise<void> => {
    const searchDogsResponse = await _searchDogs({ next: nextUrl });
    const dogsData = await _getDogsById(searchDogsResponse.data.resultIds);
    dispatch({ type: "SEARCH_DOGS", payload: searchDogsResponse.data });
    dispatch({ type: "GET_DOGS_BY_ID", payload: dogsData.data });
  }, []);

  const getBreeds = useCallback(async (): Promise<void> => {
    const breeds = await _getBreeds();
    dispatch({ type: "ADD_BREEDS", payload: breeds.data });
  }, []);

  useEffect(() => {
    if (!state.dogs || state.dogs.length === 0) {
      getDogData("");
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
  }) => {
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
    getDogData(url || "");
  };

  return {
    state,
    handlePageChange,
  };
};
