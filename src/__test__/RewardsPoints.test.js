import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import RewardsPoints, {
  calculateTransactionPoints,
} from "../components/RewardsPoints";
import { transactions } from "../data";

afterEach(() => {
  cleanup();
});
test("renders rewards points table correctly", async () => {
  const { getByText, getAllByRole } = render(<RewardsPoints />);
  expect(getByText("Rewards Points")).toBeInTheDocument();
  await waitFor(() =>
    expect(getAllByRole("row")).toHaveLength(transactions.length + 1)
  );
});
test("calculates points correctly", () => {
  const sampleTransaction = {
    customerId: 3,
    month: "September",
    amount: 200,
  };
  const points = calculateTransactionPoints(sampleTransaction.amount);
  expect(points).toBe(250);
});
