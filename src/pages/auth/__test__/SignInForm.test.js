import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInForm from "../SignInForm";

test("renders SignInForm", () => {
  render(
    <Router>
      <SignInForm />
    </Router>
  );

  const usernameField = screen.getAllByLabelText("username")[0];
  expect(usernameField).toBeInTheDocument();
  const passwordField = screen.getAllByLabelText("password")[0];
  expect(passwordField).toBeInTheDocument();

});
