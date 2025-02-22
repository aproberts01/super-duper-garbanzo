import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { _login } from "../apiClient";
import { useNavigate } from "react-router-dom";

type Errors = {
  [key: string]: { message: string };
};

const SignIn: React.FC = () => {
  const [inputValues, setInputValues] = useState<{
    name: string;
    email: string;
    errors: Errors;
  }>({
    name: "",
    email: "",
    errors: {},
  });

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleOnChange = (event: React.SyntheticEvent): void => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    const errors: Errors = {};
    event.preventDefault();

    Object.entries(inputValues).forEach(([key, value]) => {
      if (typeof value === "string") {
        if (key === "email" && !validateEmail(value)) {
          errors[key] = { message: `please enter a valid email` };
        } else if (!value) {
          errors[key] = { message: `${key} is required` };
        }
      }
    });

    const noErrors = Object.keys(errors).length === 0;

    if (!noErrors) {
      setInputValues({ ...inputValues, errors });
    } else {
      setInputValues({ name: "", email: "", errors: {} });
      login();
    }
  };

  const isInvalid = (prop: string) => {
    const { errors } = inputValues;
    return Object.keys(errors).includes(prop);
  };

  const login = () => {
    _login({ email: inputValues.email, name: inputValues.name })
      .then((response) => {
        if (response.status === 200) {
          navigate("/db");
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

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
      <h1>
        Welcome!
        <br /> Sign in to meet your new best friend 🐶
      </h1>
      <Form>
        <Form.Group className="my-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={inputValues.email}
            size="lg"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleOnChange}
            isInvalid={isInvalid("email")}
          />
          {isInvalid("email") && (
            <Form.Control.Feedback type="invalid">
              {inputValues.errors?.email?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={inputValues.name}
            size="lg"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleOnChange}
            isInvalid={isInvalid("name")}
          />
        </Form.Group>
        <Button
          onClick={handleSubmit}
          size="lg"
          variant="primary"
          type="submit"
          className="align-self-center"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
