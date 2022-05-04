import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { HOME_PAGE } from "./constants";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(HOME_PAGE.WELCOME);
  expect(linkElement).toBeInTheDocument();
});
