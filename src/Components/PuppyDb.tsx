import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { useCustomFetch } from "../customHooks";
import Dropdown from "react-bootstrap/Dropdown";

const PuppyDb = () => {
  const { state, handlePageChange, handleFilterBreeds } = useCustomFetch();

  if (!state.dogs || state.dogs.length === 0) {
    return (
      <Spinner animation="grow" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <h1 className="text-center">Puppy Adoption Database</h1>
      <div className="my-4">
        <Dropdown>
          <Dropdown.Toggle size="lg" variant="success" id="dropdown-basic">
            Filter by breed
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {state.breeds.map((breed: string) => (
              <Dropdown.Item
                onClick={() => handleFilterBreeds(breed)}
                active={state.selectedBreeds.includes(breed)}
                key={breed}
              >
                {breed}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Row xs={1} md={4} className="g-4">
        {state.dogs.map(({ img, name, age, breed, zip_code }) => (
          <Col key={name}>
            <Card className="p-0 overflow-hidden">
              <Card.Img
                style={{ height: "160px" }}
                className="object-fit-cover"
                variant="left"
                src={img}
              />
              <Card.ImgOverlay className="card-overlay text-center align-middle">
                <Button className="favorites-button" variant="primary">Add to favorites ♡</Button>
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>{breed}</Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <strong>Age:</strong> {age} <br/>
                  <strong>Location:</strong>{" "}
                  {zip_code}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="my-4 d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            disabled={state.currentPage === 1}
            onClick={() =>
              handlePageChange({
                direction: "prev",
                page: state.currentPage - 1,
              })
            }
          />
          {state.paginationStartNumber ===
            state.lastPage + 1 - state.paginationArray.length && (
            <>
              <Pagination.Item
                onClick={() =>
                  handlePageChange({
                    page: 1,
                  })
                }
              >
                1
              </Pagination.Item>
              <Pagination.Ellipsis />
            </>
          )}
          {state.paginationArray.map((page) => (
            <Pagination.Item
              onClick={() => handlePageChange({ page })}
              active={state.currentPage === page}
              key={page}
            >
              {page}
            </Pagination.Item>
          ))}
          {state.paginationStartNumber !==
            state.lastPage + 1 - state.paginationArray.length && (
            <>
              <Pagination.Ellipsis />
              <Pagination.Item
                active={state.currentPage === state.lastPage}
                onClick={() =>
                  handlePageChange({
                    page: state.lastPage,
                  })
                }
              >
                {state.lastPage}
              </Pagination.Item>
            </>
          )}
          <Pagination.Next
            disabled={state.currentPage === state.lastPage}
            onClick={() =>
              handlePageChange({
                direction: "next",
                page: state.currentPage + 1,
              })
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default PuppyDb;
