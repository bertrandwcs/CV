import React from "react";
//import firebase from "../utils/firebaseConfig";
//import { UidContext } from "./uidContext";
//import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UpdateDeleteAccordion({item}) {
  const classes = useStyles();

  return (
    <li className="li-list">
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon="More"
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </li>
  );
}










import React, { useContext, useState } from "react";
import firebase from "../utils/firebaseConfig";
import { UidContext } from "./uidContext";
import Button from '@material-ui/core/Button';
import './updatedelete.css'


const UpdateDelete = ({ item }) => {
  const [update, setUpdate] = useState(false);
  const [authorUpdate, setAuthorUpdate] = useState(null);
  const [textUpdate, setTextUpdate] = useState(null);

  const uid = useContext(UidContext);

  const authorCheck = () => {
    if (item.uid === uid) {
      return true;
    } else {
      return false;
    }
  };
  authorCheck();

  const updateItem = () => {
    let quote = firebase.database().ref("quotesDB").child(item.id);

    if (authorUpdate !== null) {
      quote.update({
        author: authorUpdate,
      });
    }
    if (textUpdate !== null) {
      quote.update({
        text: textUpdate,
      });
    }
    setUpdate(false);
  };
  const deleteItem = () => {
    let quote = firebase.database().ref("quotesDB").child(item.id);
    quote.remove();
  };

  return (
    <li className="li-list">
      {update === false && (
        <div className="item-container">
          <p>"{item.text}"</p>
          <h6>{item.author}</h6>
          {authorCheck() && (
            <div className="button-container">
              <Button onClick={() => setUpdate(!update)} variant="contained" color="primary">Update</Button>
              <Button onClick={deleteItem} variant="contained" color="primary">Delete</Button>
            </div>
          )}
        </div>
      )}
      {update && (
        <div className="item-container-update">
          <textarea
            defaultValue={item.text}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <input
            type="text"
            defaultValue={item.author}
            onChange={(e) => setAuthorUpdate(e.target.value)}
          />
          <button onClick={updateItem}>valider</button>
          
        </div>
      )}
    </li>
  );
};

export default UpdateDelete;