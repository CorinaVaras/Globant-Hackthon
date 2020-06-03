import React from "react";
import "../App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Welcome from "../Components/Welcome";
import SignUp from "../Components/SignUp";
import LogIn from "../Components/LogIn";
import Home from "../Components/Home";
import WeAre from "../Components/WeAre";
import Donate from "../Components/Donate";
import FoodAvailable from "../Components/FoodAvailable";
import CharityForm from "../Components/CharityForm";
import NotFound from "../Components/NotFound";
import Layout from "../Components/Layout";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Layout>
        <Route path="/home" component={Home} />
        <Route path="/weare" component={WeAre} />
        <Route path="/donar" component={Donate} />
        <Route path="/donaciones" component={FoodAvailable} />
        <Route path="/charityForm" component={CharityForm} />
      </Layout>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
