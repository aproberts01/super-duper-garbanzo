import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { SortAlphaDown, SortAlphaUp } from "react-bootstrap-icons";

type FilterControlProps = {
  breeds: string[];
  selectedBreeds: string[];
  sortField: string;
  handleFilterBreeds: (breed: string) => void;
  handleSort: () => void;
};

const FilterControls: React.FC<FilterControlProps> = ({
  breeds,
  selectedBreeds,
  sortField,
  handleFilterBreeds,
  handleSort,
}) => {
  return (
    <div className="my-4">
      <Row>
        <Col lg={2}>
          <Dropdown className="mb-1">
            <Dropdown.Toggle size="lg" variant="secondary" id="dropdown-basic">
              Filter by breed
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {breeds.map((breed: string) => (
                <Dropdown.Item
                  onClick={() => handleFilterBreeds(breed)}
                  active={selectedBreeds.includes(breed)}
                  key={breed}
                >
                  {breed}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          {sortField === "desc" ? (
            <Button onClick={handleSort} variant="secondary" size="lg">
              Sort Desc <SortAlphaDown />
            </Button>
          ) : (
            <Button onClick={handleSort} variant="secondary" size="lg">
              Sort Asc <SortAlphaUp />
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FilterControls;
