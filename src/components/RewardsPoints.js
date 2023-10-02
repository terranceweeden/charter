import React, { useState, useEffect } from "react";
import { transactions } from "../data";

export function calculateTransactionPoints(amount) {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return points;
}

export default function RewardsPoints() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(transactions);
        }, 1000);
      });
    };

    fetchData().then((res) => {
      const pointsData = res.map((transaction) => {
        return {
          ...transaction,
          points: calculateTransactionPoints(transaction.amount),
        };
      });
      setData(pointsData);
    });
  }, []);

  return (
    <div>
      <h1>Rewards Points</h1>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Month</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.customerId}</td>
              <td>{transaction.month}</td>
              <td>{transaction.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
