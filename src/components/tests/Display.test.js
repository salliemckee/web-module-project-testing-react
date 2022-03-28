import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";
import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const exampleShow = {
  name: "test show",
  summary: "test summary",
  seasons: [
    { id: 0, name: "season 1", episodes: [] },
    { id: 1, name: "season 2", episodes: [] },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShow);
  render(<Display />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShow);
  render(<Display />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(2);
  });
});

test("displayFunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShow);
  const displayFunc = jest.fn();
  render(<Display displayFunc={displayFunc} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
