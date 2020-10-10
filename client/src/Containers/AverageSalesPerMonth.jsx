import React from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "./SmallCard.jsx";

const AverageSalesPerMonth = () => {
  const currentYear = new Date().getFullYear();
  const transactionReducer = useSelector((state) => state.transactionReducer);
  const data = transactionReducer.filter((ele) => ele.year === currentYear);
  const sum =
    data.reduce((accum, ele) => accum + ele.amount, 0) /
    (new Date().getMonth() + 1);
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
