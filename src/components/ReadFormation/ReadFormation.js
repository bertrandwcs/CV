import React, { useState, useEffect, useContext } from "react";
import firebase from "../../utils/firebaseConfig";
import UpdateDeleteFormation from "../UpdateDeleteFormation/UpdateDeletFormation";
import { UidContext } from "../uidContext";


const ReadFormation = () => {
  const [quoteList, setQuoteList] = useState([]);

  const uid = useContext(UidContext);


  useEffect(() => {
    const formation = firebase.database().ref("formations");

   formation.on("value", (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setQuoteList(list);

    });
  }, []);

  return (
    <div className="container-read">
      <h3 >Training</h3>
      <ul className="container-ul">
        {quoteList &&
          quoteList.map((item, index) => (
              item.uid === uid?(<UpdateDeleteFormation item={item} key={index} />):""
            ))}
      </ul>
    </div>
  );

};

export default ReadFormation;
