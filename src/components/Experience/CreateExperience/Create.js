import React, { useContext, useState } from "react";
import firebase from "../../../utils/firebaseConfig";
import {UidContext} from "../../uidContext";
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import './create.css';

const CreateExperience = () => {
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');

  const uid = useContext(UidContext)

  const createQuote = () => {
    const quotesDB = firebase.database().ref("experiences");
    const quote = {
      uid,
      company,
      text,
    };
    quotesDB.push(quote);

    setCompany('');
    setText('');
  };

  return (
    <div classeName="create-container">
      <h4>Add an experience</h4>
      <div className="form">
        <Textfield
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Textfield
          placeholder="Tasks"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={createQuote} variant="contained" color="primary">Create</Button>
      </div>
    </div>
  );
};

export default CreateExperience;
