import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useCustomFetch } from "../customHooks";
import NavBar from "./NavBar";
import FilterControls from "./FilterControls";
import ListPagination from "./ListPagination";
import DogCard from "./DogCard";
import { apiClient } from "../apiClient";
import { useNavigate } from "react-router-dom";
/**
 * PuppyDb component fetches and displays a list of dogs with filtering, sorting, and pagination controls.
 * It uses a custom hook `useCustomFetch` to manage the state and API interactions.
 * If the API response indicates an unauthorized status (401), it navigates to the sign in page.
 *
 * @component
 * @example
 * return (
 *   <PuppyDb />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */
const PuppyDb = () => {
  const { state, handlePageChange, handleFilterBreeds, handleSort } =
    useCustomFetch();
  const navigate  = useNavigate();

  apiClient.interceptors.response.use(
    response => response,
    error => {
      const { response } = error;
      if (response && response.status === 401) {
        navigate('/');
      }
      return Promise.reject(error);
    }
  );

  if (!state.dogs || state.dogs.length === 0) {
    return (
      <Spinner animation="grow" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <NavBar />
      <FilterControls
        breeds={state.breeds}
        selectedBreeds={state.selectedBreeds}
        sortField={state.sortField}
        handleSort={handleSort}
        handleFilterBreeds={handleFilterBreeds}
      />
      <Row xs={1} sm={2} md={4} className="g-4">
        {state.dogs.map(({ img, name, age, breed, zip_code, city, state }) => (
          <DogCard
            key={name}
            img={img}
            name={name}
            age={age}
            breed={breed}
            zipCode={zip_code}
            city={city}
            state={state}
          />
        ))}
      </Row>
      <ListPagination
        currentPage={state.currentPage}
        lastPage={state.lastPage}
        paginationStartNumber={state.paginationStartNumber}
        paginationArray={state.paginationArray}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default PuppyDb;
