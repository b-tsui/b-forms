import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 500,
  },
});

export default function SplashSS({ image }) {
  const classes = useStyles();

  return (
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
  );
}
