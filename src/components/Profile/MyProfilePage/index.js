import React, { useState, useEffect, useContext } from "react";
import firebase from "../../../utils/firebaseConfig";
import { UidContext } from "../../uidContext";
import UpdateDeleteProfile from "../UpdateDeleteProfile/index";
import CreateProfile from "../CreateProfile/CreateProfile";
import './index.css'

const MyProfilePage = () => {
  const [profile, setProfile] = useState([]);

  const uid = useContext(UidContext);

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
    <div className="container-myprofile">
      <h1>Profile</h1>
      <ul className="container-ul-profile">
        {profile &&
          profile.map((item, index) =>
            item.uid === uid ? (
              <UpdateDeleteProfile item={item} key={index} />
            ) : (
              ""
            )
          )}
      </ul>
      <CreateProfile/>
    </div>
  );
};

export default MyProfilePage;
