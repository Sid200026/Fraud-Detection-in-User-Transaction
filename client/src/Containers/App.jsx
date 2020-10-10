import React from "react";
import cubejs from "@cubejs-client/core";
import { useCubeQuery } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";
import Container from "@material-ui/core/Container";
import { Loading } from "./Loading.jsx";
import { Dashboard } from "./Dashboard.jsx";
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
  dimensions: [
    "Transaction.category",
    "Transaction.amount",
    "Transaction.dateOfTransaction",
  ],
  timeDimensions: [
    {
      dimension: "Transaction.dateOfTransaction",
      granularity: "second",
    },
  ],
  filters: [],
  renewQuery: true,
};

const SUBSCRIPTION_SETTING = {
  subscribe: true,
  cubejsApi: cubejsApi,
};

const App = () => {
  const { resultSet } = useCubeQuery(
    [expectation_query, transaction_query],
    SUBSCRIPTION_SETTING
  );
  if (!resultSet) {
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
      <Dashboard resultSet={resultSet.loadResponses} />
    </>
  );
};

export default App;
