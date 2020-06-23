import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home-forms.css";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import DeleteIcon from "@material-ui/icons/Delete";

// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function SingleForm({ form }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className="everything">
        <Card className={classes.root} id="single-form">
          <div id="single-form-options">
            <IconButton
              onClick={handleClick}
              style={{
                padding: "8px",
                justifyContent: "flex-end",
                hover: "none",
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <Link to={{ pathname: `/form/create/${form.id}` }}>
            <CardMedia
              className={classes.media}
              image="https://clackurbucket.s3.us-east-2.amazonaws.com/default-form.png"
              title="Contemplative Reptile"
            />
            <CardHeader
              title={<div className="single-form-title">{form.title}</div>}
              subheader={
                <div className="single-form-subheader">
                  <div>
                    {`Created ${new Date(
                      Number(form.createdAt)
                    ).toLocaleDateString("en-US")}`}
                  </div>
                </div>
              }
            />
            <CardContent id={"single-form-description"}>
              <Typography variant="body2" component="p">
                {form.description}
              </Typography>
            </CardContent>
          </Link>
          {/* <CardActions className="single-set-actions-container">
            <div>
              <IconButton
                aria-label="add to favorites"
                onClick={favoriteHandler}
                style={{
                  padding: "2px",
                  color: isFavorited ? "#ffd54f" : "#eeeeee",
                }}
              >
                <StarIcon />
              </IconButton>
            </div>
            <div className="set-votes-container">
              <IconButton
                id="upvote-button"
                onClick={(e) => voteHandler(e, true)}
                style={{
                  padding: "2px",
                  color: isUpvoted ? "#9fa8da" : "#eeeeee",
                }}
              >
                <ThumbUpAltIcon style={{ padding: "2px" }} />
                <Typography variant="subtitle1">{upvotes}</Typography>
              </IconButton>
              <IconButton
                id="downvote-button"
                onClick={(e) => voteHandler(e, false)}
                style={{
                  padding: "2px",
                  color: isUpvoted === false ? "#e57373" : "#eeeeee",
                }}
              >
                <ThumbDownAltIcon style={{ padding: "2px" }} />
                <Typography variant="subtitle1">{-1 * downvotes}</Typography>
              </IconButton>
            </div>
          </CardActions> */}
        </Card>
      </div>
    </>
  );
}
