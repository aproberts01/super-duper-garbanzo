import { useEffect, useState } from "react";
import { _searchDogs, _getDogsById, _getBreeds } from "../apiClient";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const PuppyDb = () => {
  const [data, setData] = useState([]);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function getBreeds() {
      let response = await _searchDogs();
      const breeds = await _getBreeds();
      const { data: breedData } = breeds;
      const { data } = response;
      response = await _getDogsById(data.resultIds);
      setBreeds(breedData);
      setData(response.data);
    }
    if (!data || data.length === 0) {
      getBreeds();
    }
  }, [data]);

  if (!data || data.length === 0) {
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
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search by name"
          />
          <Form.Select aria-label="Default select example">
            <option>Filter by breed</option>
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </div>
      <Row xs={1} md={4} className="g-4">
        {data.map(({ img, name, age, breed, zip_code }) => (
          <Col key={name}>
            <Card className="p-0 overflow-hidden">
              <Card.Img
                style={{ height: "160px" }}
                className="object-fit-cover"
                variant="left"
                src={img}
              />
              <Card.ImgOverlay className="card-overlay text-center align-middle">
                {/* <Button variant="primary">Add to favorites</Button> */}
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>{breed}</Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <strong>Age:</strong> {age} ˗ˏˋ ♡ ˎˊ˗{" "}
                  <strong>Location:</strong> {zip_code}{" "}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PuppyDb;
