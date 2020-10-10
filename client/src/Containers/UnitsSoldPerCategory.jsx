import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const UnitsSoldPerCategory = () => {
  const data = [];
  const currentYear = new Date().getFullYear();

  const transactionReducer = useSelector((state) => state.transactionReducer);
  const amount_data = transactionReducer.filter(
    (ele) => ele.year === currentYear
  );

  amount_data.forEach((ele) => {
    const index = data.findIndex((arrEle) => arrEle.category === ele.category);
    if (index === -1) {
      data.push({
        category: ele.category,
        count: 1,
      });
    } else {
      data[index].count += 1;
    }
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Units Sold Per Category
        </Typography>
        <ResponsiveContainer height={445}>
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="top"
              height={36}
              layout="horizontal"
              payload={[
                {
                  value: data[0].category,
                  type: "circle",
                  id: "ID01",
                  color: COLORS[0],
                },
                {
                  value: data[1].category,
                  type: "circle",
                  id: "ID02",
                  color: COLORS[1],
                },
                {
                  value: data[2].category,
                  type: "circle",
                  id: "ID03",
                  color: COLORS[2],
                },
                {
                  value: data[3].category,
                  type: "circle",
                  id: "ID04",
                  color: COLORS[3],
                },
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export { UnitsSoldPerCategory };
