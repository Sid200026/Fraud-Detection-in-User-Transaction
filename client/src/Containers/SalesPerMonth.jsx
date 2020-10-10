import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

const SalesPerMonth = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const expectationReducer = useSelector((state) => state.expectationReducer);
  const expected_data = expectationReducer.filter(
    (ele) => ele.year === currentYear && ele.monthIndex < currentMonth
  );

  let data = expected_data.map((ele) => ({
    ...ele,
    amount: 0,
  }));

  const transactionReducer = useSelector((state) => state.transactionReducer);
  const amount_data = transactionReducer.filter(
    (ele) => ele.year === currentYear
  );

  amount_data.forEach((ele) => {
    const month = ele.date.getMonth();
    const objIndex = data.findIndex((ele) => ele.monthIndex === month);
    if (objIndex != -1) data[objIndex].amount += ele.amount;
  });

  data.sort((a, b) => a.monthIndex - b.monthIndex);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Sales Analysis
          </Typography>
          <ResponsiveContainer height={350}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="expected"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Legend layout="vertical" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export { SalesPerMonth };
