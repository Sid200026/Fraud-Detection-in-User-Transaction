import React from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "./SmallCard.jsx";

const ExpectedSales = () => {
  const currentYear = new Date().getFullYear();
  const expectationReducer = useSelector((state) => state.expectationReducer);
  const data = expectationReducer.filter((ele) => ele.year === currentYear);
  const sum = data.reduce((accum, ele) => accum + ele.expected, 0);
  const total_sales = `$${sum}`;
  return (
    <SmallCard
      title="Expected Sales"
      description={total_sales}
      color="rgba(152, 128, 0, 0.3)"
    />
  );
};

export { ExpectedSales };
