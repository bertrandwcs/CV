import React, { useContext, useState } from "react";
import firebase from "../../../utils/firebaseConfig";
import { UidContext } from "../../uidContext";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";


const CreateSkills = ({item}) => {
  const [hardSkills, setHardSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");

  const uid = useContext(UidContext);
  
  const authorCheck = () => {
    if (item.uid === uid) {
      return true;
    } else {
      return false;
    }
  };
  authorCheck();

  const CreateSkill = () => {
    const quotesDB = firebase.database().ref("profile").child(item.id);

    quotesDB.update({
      skills: {
        hardSkill: hardSkills,
        softSkill: softSkills,
    }});

    setHardSkills("");
    setSoftSkills("");
  };

  return (
    
    <div>
      <Textfield
        type="text"
        placeholder="Hard skills"
        value={hardSkills}
        onChange={(e) => setHardSkills(e.target.value)}
        required
      />
      <Textfield
        type="text"
        placeholder="Soft Skills"
        value={softSkills}
        onChange={(e) => setSoftSkills(e.target.value)}
        required
      />
      <Button onClick={CreateSkill} variant="contained" color="primary">
        Create
      </Button>
    </div>
    
  );
};

export default CreateSkills;
