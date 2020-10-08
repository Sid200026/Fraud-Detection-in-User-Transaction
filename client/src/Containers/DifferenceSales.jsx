import React from "react";
import { SmallCard } from "./SmallCard.jsx";
import { data } from "../Mock Data/data1";

const DifferenceSales = () => {
  const expectation_sum = data.reduce(
    (accum, ele) => accum + ele.expectation,
    0
  );
  const amount_sum = data.reduce((accum, ele) => accum + ele.amount, 0);
  const difference = amount_sum - expectation_sum;
  let color;
  let sign;
  if (difference < 0) {
    color = "rgba(255, 0, 0, 0.3)";
    sign = "↓";
  } else {
    color = "rgba(0, 196, 0, 0.3)";
    sign = "↑";
  }
  const diff_sales = `$${Math.abs(difference)} ${sign}`;
  return (
    <SmallCard
      title="Actual vs Expected Sales"
      description={diff_sales}
      color={color}
    />
  );
};

export { DifferenceSales };
