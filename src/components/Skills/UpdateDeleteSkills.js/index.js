import React from "react";
import "./index.css";

const UpdateDeleteSkills = ({ item }) => {




  return (
        <div>
          { item.skills &&(
          <ul>
            <h3>Hard Skills</h3>
            <li>{item.skills.hardSkill}</li>
            <h3>Soft Skills</h3>
            <li>{item.skills.softSkill}</li>
          </ul>
          )}
        </div>
  );
};

export default UpdateDeleteSkills;