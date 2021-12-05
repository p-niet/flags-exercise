import React from "react";
import Header from "./components/Header";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router basename={`/flags-exercise`}>
      <Header />
      <Route exact path="/">
        <Countries />
      </Route>
      <Route path="/countries/:name" children={<Country />}></Route>
    </Router>
  );
}

export default App;
