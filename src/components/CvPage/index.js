import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebaseConfig";
import UpdateDelete from "../UpdateDelete";
import UpdateDeleteFormation from "../UpdateDeleteFormation/UpdateDeletFormation";
import "./index.css";
import UpdateDeleteProfile from "../Profile/UpdateDeleteProfile/index";
import gifFinteen from "../../Assets/finteenfinalversion.gif";

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
    <div className="container-cvPage">
      <div className="grid-profile">
        <div className="container-user">
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
        </div>
        <div className="profile-container-skills">
          <ul>
            <h3>Hard skills</h3>
            <li>
              Front-end : React / Hooks / Redux / Javascript / Html / Css /
              Bootstrap
            </li>
            <li>Back-end : Nodejs / Express / Postman</li>
            <li>Database : SQL / Mysql / Sequelize</li>
            <li>Developer :Github, GitLab / Visualstudio / Linux </li>
          </ul>
          <ul>
            <h3>soft skills</h3>
            <li>Organization and project management (Scrum method)</li>
            <li>Coaching/trainer</li>
            <li>Commercial negotiation</li>
          </ul>
        </div>
        <a
          href="https://portfolio-bertrand-cardon.webflow.io/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="profile-container-portfolio">
            <img src={gifFinteen} alt="gifFinteen" className="img-portfolio" />
            <ul>
              <h3>Portfolio</h3>
              <li>(Made in Weflow)</li>
            </ul>
          </div>
        </a>
      </div>
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
