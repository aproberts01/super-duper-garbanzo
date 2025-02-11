import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const SignIn = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "30rem",
        border: "solid 1px black",
        padding: "4rem",
        borderRadius: "0.8rem",
      }}
    >
      <h1>Welcome!<br/> Sign in to meet your new best friend 🐶</h1>
      <Form>
        <Form.Group className="my-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control size="lg" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control size="lg" type="name" placeholder="Name" />
        </Form.Group>
        <Button size="lg" variant="primary" type="submit" className="align-self-center">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
