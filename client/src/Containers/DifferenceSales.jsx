import React from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "./SmallCard.jsx";

const DifferenceSales = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const expectationReducer = useSelector((state) => state.expectationReducer);
  const expected_data = expectationReducer.filter(
    (ele) => ele.year === currentYear && ele.monthIndex < currentMonth 
  );
  const expectation_sum = expected_data.reduce(
    (accum, ele) => accum + ele.expected,
    0
  );

  const transactionReducer = useSelector((state) => state.transactionReducer);
  const amount_data = transactionReducer.filter(
    (ele) => ele.year === currentYear
  );
  const amount_sum = amount_data.reduce((accum, ele) => accum + ele.amount, 0);
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
