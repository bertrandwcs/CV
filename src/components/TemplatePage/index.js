import React, { useState, useEffect, useContext } from "react";
import firebase from "../../utils/firebaseConfig";
import UpdateDelete from "../UpdateDelete";
import UpdateDeleteFormation from "../UpdateDeleteFormation/UpdateDeletFormation";
import CreateFormation from "../CreateFormation/CreateFormation";
import { UidContext } from "../uidContext";
import "./index.css";
import Create from "../Create";
import UpdateDeleteProfile from "../Profile/UpdateDeleteProfile";

const CvPage = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [profile, setProfile] = useState([]);
  const [formation, setFormation] = useState([]);

  const uid = useContext(UidContext);

  useEffect(() => {
    const experience = firebase.database().ref("experiences");

    experience.on("value", (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setQuoteList(list);
    });
  }, []);

  useEffect(() => {
    const profile = firebase.database().ref("profile");

    profile.on("value", (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setProfile(list);
    });
  }, []);

  useEffect(() => {
    const formation = firebase.database().ref("formations");

    formation.on("value", (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setFormation(list);
    });
  }, []);

  return (
    <div className="container-read">
      <ul className="container-ul">
        {profile &&
          profile.map((item, index) =>
            item.uid === uid ? <UpdateDeleteProfile item={item} key={index} /> : ""
          )}
      </ul>

      <h3 className="title-experience">Professional experiences</h3>
      <ul className="container-ul">
        {quoteList &&
          quoteList.map((item, index) =>
            item.uid === uid ? <UpdateDelete item={item} key={index} /> : ""
          )}
      </ul>
      <h3>Training</h3>
      <ul className="container-ul">
        {formation &&
          formation.map((item, index) =>
            item.uid === uid ? (
              <UpdateDeleteFormation item={item} key={index} />
            ) : (
              ""
            )
          )}
      </ul>
      <Create />
      <CreateFormation />
    </div>
  );
};

export default CvPage;
