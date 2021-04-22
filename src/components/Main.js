import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuAppBar from './MenuAppBar/index';
import Navbar from './Navbar/index';
import CvPage from './CvPage/index';
import "./main.css";

//import Read from './Read';
/* import Create from './Create';


import CreateFormation from './CreateFormation/CreateFormation';
import ReadFormation from './ReadFormation/ReadFormation';
import CreateProfile from './Profile/CreateProfile/CreateProfile'; */
//
import TemplatePage from './TemplatePage/index';
import MyProfilePage from './Profile/MyProfilePage/index'
import Footer from './Footer';

const Main = () => {
    return (
<main className="main-container">
    <MenuAppBar/>
    <Navbar/>
    <Switch>
        <Route exact path="/" component={CvPage} />
        <Route path="/template/" component={TemplatePage} />
        <Route path="/profile/" component={MyProfilePage} />
    </Switch>
    <Footer/>
</main>
    );
};

export default Main;