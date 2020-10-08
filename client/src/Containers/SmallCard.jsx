import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const SmallCard = (props) => {
  return (
    <>
      <Card
        style={{
          marginBottom: "1rem",
          background: props.color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{ marginTop: "0.5rem" }}
          >
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="initial" component="subtitle1">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
export { SmallCard };