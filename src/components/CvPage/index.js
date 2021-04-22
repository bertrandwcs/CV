import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebaseConfig";
import UpdateDelete from "../UpdateDelete";
import UpdateDeleteFormation from "../UpdateDeleteFormation/UpdateDeletFormation";
import "./index.css";
import UpdateDeleteProfile from '../Profile/UpdateDeleteProfile/index'

const CvPage = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [profile, setProfile] = useState([]);
  const [formation, setFormation] = useState([]);

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
            item.uid === "cLEV0torEifx0FsJ9W7hJ8MRrsO2" ? (
              <UpdateDeleteProfile item={item} key={index} />
            ) : (
              ""
            )
          )}
      </ul>

      <h3 className="title-experience">Professional experiences</h3>
      <ul className="container-ul">
        {quoteList &&
          quoteList.map((item, index) =>
            item.uid === "cLEV0torEifx0FsJ9W7hJ8MRrsO2" ? (
              <UpdateDelete item={item} key={index} />
            ) : (
              ""
            )
          )}
      </ul>
      <h3>Training</h3>
      <ul className="container-ul">
        {formation &&
          formation.map((item, index) =>
            item.uid === "cLEV0torEifx0FsJ9W7hJ8MRrsO2" ? (
              <UpdateDeleteFormation item={item} key={index} />
            ) : (
              ""
            )
          )}
      </ul>
    </div>
  );
};

export default CvPage;
