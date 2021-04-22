import React from "react";
import './index.css';
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { NavLink } from "react-router-dom";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import AddToPhotosSharpIcon from '@material-ui/icons/AddToPhotosSharp';
import ArtTrackSharpIcon from '@material-ui/icons/ArtTrackSharp';

const useStyles = makeStyles({
  root: {
    width: 500
  },
});

export default function BurgerMenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div className="container-menu">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        // className={classes.root}
      >
        <BottomNavigationAction
          label="CV Bertrand Cardon"
          component={NavLink}
          to="/"
          icon={<ArtTrackSharpIcon />}
        />

        <BottomNavigationAction
          label="Create your CV"
          component={NavLink}
          to="/template/"
          icon={<AddToPhotosSharpIcon />}
        />

        <BottomNavigationAction
          label="My profile"
          component={NavLink}
          to="/profile/"
          icon={<AccountCircleSharpIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
