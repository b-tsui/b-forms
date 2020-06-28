import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    width: 345,
    minWidth: 345,
  },
  media: {
    height: 500,
  },
});

export default function SplashSS({ image }) {
  const classes = useStyles();

  return (
    <div className="splash-ss-container">
      <Card className={classes.root}>
        <CardContent
          className="splash-ss-title"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {image.title}
        </CardContent>
        <CardMedia
          className={classes.media}
          image={image.src}
          title="bform screenshots"
        />
      </Card>
    </div>
  );
}
