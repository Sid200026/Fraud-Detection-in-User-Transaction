import React from "react";
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

import { data } from "../Mock Data/data1";
const SalesPerMonth = () => {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
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
                dataKey="expectation"
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
