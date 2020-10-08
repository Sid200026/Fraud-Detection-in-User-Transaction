import React from "react";
import { SmallCard } from "./SmallCard.jsx";
import { data } from "../Mock Data/data1";

const TotalSales = () => {
  const sum = data.reduce((accum, ele) => accum + ele.amount, 0);
  const total_sales = `$${sum}`;
  return (
    <SmallCard
      title="Total Sales"
      description={total_sales}
      color="rgba(0, 0, 188, 0.3)"
    />
  );
};

export { TotalSales };
