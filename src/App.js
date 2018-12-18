import React, { Component } from "react";
import "./App.css";
import Stopwatch from "./Stopwatch";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Cooldown-Planner</p>
          <Stopwatch />
        </header>
      </div>
    );
  }
}

export default App;
