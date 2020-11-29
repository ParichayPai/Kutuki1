import './App.css';
import React from "react";
import Home from "./components/home"
import {Switch, Route, Redirect} from "react-router-dom";
import SingleItem from "./components/singleItem"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/assets/:index" component={SingleItem} />
        <Route path="/assets" component={Home} />
        <Redirect to="/assets" />
      </Switch>
    </div>
  );
}

export default App;
