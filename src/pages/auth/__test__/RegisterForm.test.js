import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterForm from "../RegisterForm";

test("renders RegisterForm", () => {
  render(
    <Router>
      <RegisterForm />
    </Router>
  );

  const registerFormHeader = screen.getByText("create an account");
  expect(registerFormHeader).toBeInTheDocument();

  const usernameField = screen.getAllByLabelText("username")[0];
  expect(usernameField).toBeInTheDocument();
  const password1Field = screen.getAllByLabelText("password")[0];
  expect(password1Field).toBeInTheDocument();
  const password2Field = screen.getAllByLabelText("confirm password")[0];
  expect(password2Field).toBeInTheDocument();
});
