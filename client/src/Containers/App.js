import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { SalesPerMonth } from "./SalesPerMonth.jsx";
import { TotalSales } from "./TotalSales.jsx";
import { ExpectedSales } from "./ExpectedSales.jsx";
import { DifferenceSales } from "./DifferenceSales.jsx";
import { AverageSalesPerMonth } from "./AverageSalesPerMonth.jsx";
import "../Styles/App.css";
const App = () => {
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
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
