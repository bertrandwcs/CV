import React, { useContext, useState } from "react";
import firebase from "../utils/firebaseConfig";
import { UidContext } from "./uidContext";
import Button from "@material-ui/core/Button";
import "./updatedelete.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";


const UpdateDelete = ({ item }) => {
  const [update, setUpdate] = useState(false);
  const [companyUpdate, setCompanyUpdate] = useState(null);
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
    let quote = firebase.database().ref("experiences").child(item.id);

    if (companyUpdate !== null) {
      quote.update({
        company: companyUpdate,
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
    let quote = firebase.database().ref("experiences").child(item.id);
    quote.remove();
  };

  return (
    <li className="li-list">
      {update === false && (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon="^"
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.company}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.text}</Typography>

            </AccordionDetails>
            {authorCheck() && (
                <div className="button-container">
                  <Button
                    onClick={() => setUpdate(!update)}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={deleteItem}
                    variant="contained"
                    color="primary"
                  >
                    Delete
                  </Button>
                </div>
              )}
          </Accordion>
        </div>
      )}
      {update && (
        <div className="item-container-update">
          <textarea
            defaultValue={item.company}
            onChange={(e) => setCompanyUpdate(e.target.value)}
          />
          <input
            type="text"
            defaultValue={item.text}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <button onClick={updateItem}>valider</button>
        </div>
      )}
    </li>
  );
};

export default UpdateDelete;
