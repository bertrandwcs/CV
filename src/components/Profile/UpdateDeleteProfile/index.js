import React, { useContext, useState } from "react";
import firebase from "../../../utils/firebaseConfig";
import { UidContext } from "../../uidContext";
import Button from "@material-ui/core/Button";
import Textfield from "@material-ui/core/Textfield";
import './index.css';
import gifFinteen from '../../../Assets/finteenfinalversion.gif'

const UpdateDeleteProfile = ({ item }) => {
  const [update, setUpdate] = useState(false);
  const [nameUpdate, setNameUpdate] = useState(null);
  const [adressUpdate, setAdressUpdate] = useState(null);
  const [mobileUpdate, setMobileUpdate] = useState(null);
  const [emailUpdate, setEmailUpdate] = useState(null);

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
    let quote = firebase.database().ref("profile").child(item.id);

    if (nameUpdate !== null) {
      quote.update({
        name: nameUpdate,
      });
    }
    if (adressUpdate !== null) {
      quote.update({
        adress: adressUpdate,
      });
    }
    if (mobileUpdate !== null) {
      quote.update({
        mobile: mobileUpdate,
      });
    }
    if (emailUpdate !== null) {
      quote.update({
        email: emailUpdate,
      });
    }
    setUpdate(false);
  };
  const deleteItem = () => {
    let quote = firebase.database().ref("profile").child(item.id);
    quote.remove();
  };

  return (
    <li className="li-list">
      {update === false && (
        <div className="profile-information-container">
          <div className="profile-container">
            <img src={item.url} alt="profile" className="img-profile"/>
            <ul>
              <li className="name">{item.name}</li>
              <li>{item.adress}</li>
              <li>{item.mobile}</li>
              <li>{item.email}</li>
            </ul>
          </div>
          <div className="profile-container-skills">
            <ul>
              <h3>Hard skills</h3> 
              <li>Front-end : React / Hooks / Redux / Javascript / Html / Css / Bootstrap</li>
              <li>Back-end : Nodejs / Express / Postman</li>
              <li>Database : SQL / Mysql / Sequelize</li>
              <li>Developer :Github, GitLab / Visualstudio / Linux </li>
            </ul>
            <ul>
              <h3>soft skills</h3> 
              <li >Organization and project management (Scrum method)</li>
              <li>Coaching/trainer</li>
              <li>Commercial negotiation</li>
            </ul>
          </div>
          <a href="https://portfolio-bertrand-cardon.webflow.io/" target="_blank" rel="noreferrer">
          <div className="profile-container-portfolio">
            <img src={gifFinteen} alt="gifFinteen" className="img-portfolio"/>
            <ul>
              <h3>Portfolio</h3> 
              <li >(Made in Weflow)</li>
            </ul>
          </div>
          </a>
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
          
        </div>
      )}
      {update && (
        <div >
          <Textfield
            defaultValue={item.name}
            onChange={(e) => setNameUpdate(e.target.value)}
          />
          <Textfield
            type="text"
            defaultValue={item.adress}
            onChange={(e) => setAdressUpdate(e.target.value)}
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={10}
          />
          <Textfield
            defaultValue={item.mobile}
            onChange={(e) => setMobileUpdate(e.target.value)}
          />
          <Textfield
            defaultValue={item.email}
            onChange={(e) => setEmailUpdate(e.target.value)}
          />
          <Button onClick={updateItem} variant="contained" color="primary">
            valider
          </Button>
        </div>
      )}
    </li>
  );
};

export default UpdateDeleteProfile;
