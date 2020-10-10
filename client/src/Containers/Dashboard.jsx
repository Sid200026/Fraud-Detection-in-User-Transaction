import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import cubejs from "@cubejs-client/core";
import WebSocketTransport from "@cubejs-client/ws-transport";
import { SalesPerMonth } from "./SalesPerMonth.jsx";
import { TotalSales } from "./TotalSales.jsx";
import { ExpectedSales } from "./ExpectedSales.jsx";
import { DifferenceSales } from "./DifferenceSales.jsx";
import { AverageSalesPerMonth } from "./AverageSalesPerMonth.jsx";
import { SalesPerCategory } from "./SalesPerCategory.jsx";
import { UnitsSoldPerCategory } from "./UnitsSoldPerCategory.jsx";
import { addExpectation, addTransaction } from "../Redux/actions";
import "../Styles/App.css";

const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDIyNTY1MTYsImV4cCI6MTYwMjM0MjkxNn0.8vGel2gGTXJsyF6MhXypgaKh9lXWejfnPzTlnwtFvEo";
let WS_URL;
if (process.env.NODE_ENV === "production") {
  WS_URL = window.location.origin.replace("http", "ws").replace("https", "wss");
} else {
  WS_URL = "ws://localhost:4000/";
}

const cubejsApi = cubejs({
  transport: new WebSocketTransport({
    authorization: CUBEJS_TOKEN,
    apiUrl: WS_URL,
  }),
});

const expectation_query = {
  dimensions: ["Expectation.expected", "Expectation.month", "Expectation.year"],
  order: {
    "Expectation.year": "asc",
  },
  filters: [],
  measures: [],
  timeDimensions: [],
};

const transaction_query = {
  measures: [],
  timeDimensions: [],
  dimensions: [
    "Transaction.category",
    "Transaction.amount",
    "Transaction.dateOfTransaction",
  ],
  filters: [],
  renewQuery: true,
};

const SUBSCRIPTION_SETTING = {
  subscribe: true,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactionReducer = useSelector((state) => state.transactionReducer);
  const expectationReducer = useSelector((state) => state.expectationReducer);
  useEffect(() => {
    cubejsApi
      .load(expectation_query)
      .then((res) =>
        dispatch(addExpectation(res.loadResponse.results[0].data))
      );
  }, []);

  useEffect(() => {
    cubejsApi
      .load(transaction_query, SUBSCRIPTION_SETTING)
      .then((res) =>
        dispatch(addTransaction(res.loadResponse.results[0].data))
      );
  }, []);

  if (transactionReducer.length === 0 || expectationReducer.length === 0) {
    return <p>Waiting</p>;
  }

  return (
    <>
      <Container maxWidth="lg" className="app__container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SalesPerMonth />
          </Grid>
          <Grid item xs={3}>
            <TotalSales />
          </Grid>
          <Grid item xs={3}>
            <ExpectedSales />
          </Grid>
          <Grid item xs={3}>
            <DifferenceSales />
          </Grid>
          <Grid item xs={3}>
            <AverageSalesPerMonth />
          </Grid>
          <Grid item xs={6}>
            <SalesPerCategory />
          </Grid>
          <Grid item xs={6}>
            <UnitsSoldPerCategory />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { Dashboard };
