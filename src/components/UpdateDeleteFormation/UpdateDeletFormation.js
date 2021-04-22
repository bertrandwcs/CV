import React, { useContext, useState } from "react";
import firebase from "../../utils/firebaseConfig";
import { UidContext } from "../uidContext";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/Textfield";



const UpdateDeleteFormation = ({ item }) => {
  const [update, setUpdate] = useState(false);
  const [formationUpdate, setFormationUpdate] = useState(null);
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
    let quote = firebase.database().ref("formations").child(item.id);

    if (formationUpdate !== null) {
      quote.update({
        formation: formationUpdate,
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
    let quote = firebase.database().ref("formations").child(item.id);
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
              <Typography>{item.formation}</Typography>
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
          <Textfield
            defaultValue={item.formation}
            onChange={(e) => setFormationUpdate(e.target.value)}
          />
          <Textfield
            type="text"
            defaultValue={item.text}
            onChange={(e) => setTextUpdate(e.target.value)}
            id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          />
          <Button onClick={updateItem} variant="contained" color="primary">
            valider
          </Button>
        </div>
      )}
    </li>
  );
};

export default UpdateDeleteFormation;
