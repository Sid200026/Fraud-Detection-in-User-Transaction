import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { SalesPerMonth } from "./SalesPerMonth.jsx";
import { TotalSales } from "./TotalSales.jsx";
import { ExpectedSales } from "./ExpectedSales.jsx";
import { DifferenceSales } from "./DifferenceSales.jsx";
import { AverageSalesPerMonth } from "./AverageSalesPerMonth.jsx";
import { SalesPerCategory } from "./SalesPerCategory.jsx";
import { UnitsSoldPerCategory } from "./UnitsSoldPerCategory.jsx";
import { Loading } from "./Loading.jsx";
import { addExpectation, addTransaction } from "../Redux/actions";
import "../Styles/App.css";

const Dashboard = ({ resultSet }) => {
  const dispatch = useDispatch();

  const transactionReducer = useSelector((state) => state.transactionReducer);
  const expectationReducer = useSelector((state) => state.expectationReducer);

  const [response1, response2] = resultSet;
  useEffect(() => {
    dispatch(addExpectation(response1.data));
  }, []);

  if (transactionReducer.length !== response2.data.length)
    dispatch(addTransaction(response2.data));

  if (transactionReducer.length === 0 || expectationReducer.length === 0) {
    return (
      <Container maxWidth="lg" className="app__container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading />
        </div>
      </Container>
    );
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
