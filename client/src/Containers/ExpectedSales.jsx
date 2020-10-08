import React from "react";
import { SmallCard } from "./SmallCard.jsx";
import { data } from "../Mock Data/data1";

const ExpectedSales = () => {
  const sum = data.reduce((accum, ele) => accum + ele.expectation, 0);
  const total_sales = `$${sum}`;
  return (
    <SmallCard
      title="Expected Sales"
      description={total_sales}
      color="rgba(152, 228, 0, 0.3)"
    />
  );
};

export { ExpectedSales };
