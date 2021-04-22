import React, { useContext, useState } from "react";
import firebase from "../../../utils/firebaseConfig";
import { UidContext } from "../../uidContext";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import { storage } from "../../../utils/firebaseConfig";
import "./index.css";
import LinearProgress from "@material-ui/core/LinearProgress";


const CreateProfile = () => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const uid = useContext(UidContext);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };

  const createQuote = () => {
    const quotesDB = firebase.database().ref("profile");
    const quote = {
      uid,
      name,
      adress,
      mobile,
      email,
      url,
    };
    quotesDB.push(quote);

    setName("");
    setAdress("");
    setMobile("");
    setEmail("");
    setUrl("");
  };

  return (
    <div classeName="create">
      <h4>Add your profile</h4>
      <div className="form">
        <div>
          <Textfield
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textfield
            type="text"
            placeholder="Adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </div>
        <div>
          <Textfield
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <Textfield
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="container-upload">
          <Button variant="contained" color="primary" component="label">
            <input type="file" onChange={handleChange} hidden />Add a picture</Button>
          <Button onClick={handleUpload} variant="contained" color="primary">
            upload
          </Button>
          <Textfield value={url} onChange={(e) => setUrl(e.target.value)} required />
          <div>
            {url && (
              <img className="profile-img" src={url} alt="ProfilePicture" />
            )}
          </div>
        </div>
        <div className="container-progress">
          <LinearProgress
            variant="determinate"
            value={progress}
            max="100"
            color="secondary"
          />
        </div>
      </div>
      <Button onClick={createQuote} variant="contained" color="primary">
        Create
      </Button>
    </div>
  );
};

export default CreateProfile;
