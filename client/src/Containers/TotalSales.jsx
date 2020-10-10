import React from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "./SmallCard.jsx";

const monthMapping = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TotalSales = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const transactionReducer = useSelector((state) => state.transactionReducer);
  const data = transactionReducer.filter((ele) => ele.year === currentYear);
  const sum = data.reduce((accum, ele) => accum + ele.amount, 0);
  const monthName = monthMapping[currentMonth - 1];
  const title = `Total Sales till ${monthName}, ${currentYear}`;
  const total_sales = `$${sum}`;
  return (
    <SmallCard
      title={title}
      description={total_sales}
      color="rgba(0, 0, 188, 0.3)"
    />
  );
};

export { TotalSales };
