import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import firebase from "../../utils/firebaseConfig";
import Button from "@material-ui/core/Button";
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar variant="dense" className="container">

          <Typography variant="h6" color="inherit">
            
          </Typography>
          <h4 className="titre-navbar">Welcome {firebase.auth().currentUser.displayName}</h4>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => firebase.auth().signOut()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
