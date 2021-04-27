import React, { useState, useEffect, useContext } from "react";
import firebase from "../../utils/firebaseConfig";
import UpdateDeleteExperience from "../Experience/UpdateDeleteExperience/UpdateDelete";
import UpdateDeleteFormation from "../Formation/UpdateDeleteFormation";
import CreateFormation from "../Formation/CreateFormation/index";
import { UidContext } from "../uidContext";
import "./index.css";
import CreateExperience from "../Experience/CreateExperience/Create";
import UpdateDeleteProfile from "../Profile/UpdateDeleteProfile";
import UpdateDeleteSkills from "../Skills/UpdateDeleteSkills.js";
import CreateSkills from "../Skills/CreateSkills.js";

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
      <div className="grid-profile">
        <div className="container-user">
          <ul className="container-ul">
            {profile &&
              profile.map((item, index) =>
                item.uid === uid ? (
                  <UpdateDeleteProfile item={item} key={index} />
                ) : (
                  ""
                )
              )}
          </ul>
        </div>
        <ul className="container-ul">
          {profile.map((item, index) =>
            item.uid === uid && item.skills? (
              <div className="profile-container-skills">
                <UpdateDeleteSkills item={item} key={index} />
              </div>
            ) : (
              ""
            )
          )}
        </ul>
      </div>

      <ul className="container-ul">
      {quoteList && (<h3 className="title-experience">Professional experiences</h3>)}
        {quoteList &&
          quoteList.map((item, index) =>
            item.uid === uid ? (
              <div>
                <UpdateDeleteExperience item={item} key={index} />{" "}
              </div>
            ) : (
              ""
            )
          )}
      </ul>

      <ul className="container-ul">
        <h3>Training</h3>
        {formation &&
          formation.map((item, index) =>
            item.uid === uid ? (
              <div>        
                <UpdateDeleteFormation item={item} key={index} />
              </div>
            ) : (
              ""
            )
          )}
      </ul>
      <ul className="container-ul">
        {!profile.skills && profile.map((item, index) =>
          item.uid === uid ? (
            <div>
              <h3>skills</h3>
              <CreateSkills item={item} key={index} />
            </div>
          ) : (
            ""
          )
        )}
      </ul>

      <CreateExperience />
      <CreateFormation />
    </div>
  );
};

export default CvPage;
