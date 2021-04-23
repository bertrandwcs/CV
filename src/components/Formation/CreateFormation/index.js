import React, { useContext, useState } from "react";
import firebase from "../../../utils/firebaseConfig";
import {UidContext} from "../../uidContext";
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';

const CreateFormation = () => {
  const [formation, setformation] = useState('');
  const [text, setText] = useState('');

  const uid = useContext(UidContext)

  const createQuote = () => {
    const quotesDB = firebase.database().ref("formations");
    const quote = {
      uid,
      formation,
      text,
    };
    quotesDB.push(quote);

    setformation('');
    setText('');
  };

  return (
    <div classeName="create">
      <h4>Add a training</h4>
      <div className="form">
        <Textfield
          type="text"
          placeholder="Formation"
          value={formation}
          onChange={(e) => setformation(e.target.value)}
        />
        <Textfield
          placeholder="Subject"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={createQuote} variant="contained" color="primary">Create</Button>
      </div>
    </div>
  );
};

export default CreateFormation;
