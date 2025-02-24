import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type DogCardProps = {
  img: string;
  name: string;
  breed: string;
  age: number;
  zipCode: string;
  city?: string;
  state?: string;
};

const DogCard: React.FC<DogCardProps> = ({
  img,
  name,
  breed,
  age,
  zipCode,
  city,
  state,
}) => {
  return (
    <Col key={name}>
      <Card className="p-0 overflow-hidden">
        <Card.Img
          style={{ height: "160px" }}
          className="object-fit-cover"
          variant="left"
          src={img}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{breed}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <small className="text-muted">
                <strong>Age:</strong> {age === 0 ? "< 1" : age}
              </small>
            </Col>
            <Col style={{ textAlign: 'end' }}>
              <small className="text-muted" style={{ whiteSpace:'nowrap' }}>
                {city && state ? `  ${city}, ${state}` : zipCode}
              </small>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default DogCard;
