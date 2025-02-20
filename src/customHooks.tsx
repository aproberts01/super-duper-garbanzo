import { useCallback, useEffect, useReducer } from "react";
import { _searchDogs, _getDogsById, _getBreeds } from "./apiClient";
import { reducer, initialState } from "./reducer";

export const useCustomFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDogData = useCallback(async ({url, breeds}: {url: string, breeds: string[]}): Promise<void> => {
    const searchDogsResponse = await _searchDogs({ url, breeds });
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
      getDogData({url: ""});
    }

    if (!state.breeds || state.breeds.length === 0) {
      getBreeds();
    }
  }, [state.dogs, state.breeds, state.selectedBreeds, getDogData, getBreeds]);

  useEffect(() => {
    if (state.selectedBreeds.length > 0) {
      getDogData({url: "", breeds: state.selectedBreeds})
    }
  }, [state.selectedBreeds, getDogData])

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
    getDogData({url: url || "", breeds: state.selectedBreeds});
  };

  const handleFilterBreeds = (breed: string) => {
    dispatch({
      type: "FILTER_BREEDS",
      payload: breed,
    });  
  }

  return {
    state,
    handlePageChange,
    handleFilterBreeds,
  };
};
