import React, {useState, useEffect} from 'react';
import firebase from './utils/firebaseConfig';
import Main from './components/Main';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './app.css';
import {UidContext} from './components/uidContext';
import LogoCV from "./Assets/logoCV.png";

const App = () => {

const [isSignedIn, setSignedIn] = useState(false);
const [uid, setUid] = useState(null);

const uiConfig = {
  signInFlow:"popup",
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,

  ],
  callbacks: {
    signInSuccess: () => false,
  },
};

  useEffect( () => {
    firebase.auth().onAuthStateChanged((user) => {
      setSignedIn(!!user);
      setUid(user.uid);
    });
  }, [])


  return (
    <div>
    <UidContext.Provider value={uid} >
    <div className="app" style={{textAlign: 'center'}}>
      {isSignedIn? (
        <Main/>
      ) : (
        <div className="login-page">
          <h1 className="title">CV Bertrand Cardon</h1>
          <h3 className="title" >Login</h3>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <img src={LogoCV} alt="logocv" className="logo-cv" />
          <p>Version bêta</p>
        </div>
      )}
    </div>
    
    </UidContext.Provider>
      
      </div>
  );
};

export default App;