import React, { useState, useEffect, useContext } from "react";
import firebase from "../utils/firebaseConfig";
import UpdateDelete from "./UpdateDelete";
import { UidContext } from "./uidContext";
import "./read.css";


const Read = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [profile, setProfile] = useState([]);

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

  return (
    <div className="container-read">
        {profile.map(elem => {
          return <ul className="container-ul">
            <li>{elem.name}</li>
            <li>{elem.adresse}</li>
            <li>{elem.mobile}</li>
            <li>{elem.email}</li>
          </ul>
        })}

      <h3 className="title-experience">Professional experiences</h3>
      <ul className="container-ul">
        {quoteList &&
          quoteList.map((item, index) =>
            item.uid === uid ? <UpdateDelete item={item} key={index} /> : ""
          )}
      </ul>
    </div>
  );
};

export default Read;
