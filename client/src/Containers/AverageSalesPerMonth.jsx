import React from "react";
import { SmallCard } from "./SmallCard.jsx";
import { data } from "../Mock Data/data1";

const AverageSalesPerMonth = () => {
  const sum = data.reduce((accum, ele) => accum + ele.amount, 0) / 12;
  const total_sales = `$${sum.toFixed(2)} per month`;
  return (
    <SmallCard
      title="Average Sales"
      description={total_sales}
      color="rgba(232, 48, 164, 0.3)"
    />
  );
};

export { AverageSalesPerMonth };
