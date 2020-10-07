import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { SalesPerMonth } from "./SalesPerMonth.jsx";
import "../Styles/App.css";
const App = () => {
  return (
    <>
      <Container maxWidth="lg" className="app__container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SalesPerMonth />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
