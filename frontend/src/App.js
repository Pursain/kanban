import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p> hello! </p>
          <Board />
        </header>
      </div>
    </Provider>
  );
}

export default App;
