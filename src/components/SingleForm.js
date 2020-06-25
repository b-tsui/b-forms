import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home-forms.css";
import SingleFormShareDialogue from "./SingleFormShareDialogue";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SingleFormDeleteDialog from "./SingleFormDeleteDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function SingleForm({ form, refetch }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <SingleFormShareDialogue formId={form.id} />
              </MenuItem>
              <MenuItem className="delete-button" onClick={handleClose}>
                <SingleFormDeleteDialog
                  formId={form.id}
                  formTitle={form.title}
                  refetch={refetch}
                />
              </MenuItem>
            </Menu>
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
        </Card>
      </div>
    </>
  );
}
