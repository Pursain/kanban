import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> hello! </p>
        <Board />
      </header>
    </div>
  );
}

export default App;
