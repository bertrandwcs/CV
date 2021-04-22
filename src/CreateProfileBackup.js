import React, { useContext, useState } from "react";
import firebase from "../../../utils/firebaseConfig";
import { UidContext } from "../../uidContext";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import { storage } from "./firebase";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const uid = useContext(UidContext);

  const createQuote = () => {
    const quotesDB = firebase.database().ref("profile");
    const quote = {
      uid,
      name,
      adress,
      mobile,
      email,
    };
    quotesDB.push(quote);

    setName("");
    setAdress("");
    setMobile("");
    setEmail("");
  };

  return (
    <div classeName="create">
      <h4>Add your profile</h4>
      <div className="form">
        <Textfield
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textfield
          type="text"
          placeholder="Adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
        <Textfield
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <Textfield
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={createQuote} variant="contained" color="primary">
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;
