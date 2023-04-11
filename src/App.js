import React from "react";
import PlayerBar from "./playerbar/PlayerBar";
import BackGround from "./background/BackGround";
import Todo from "./todo/todo";
import "./App.css";
const App = () => {
  return (
    <div className="main-div">
      <BackGround></BackGround>
      <Todo className="todolist" />
      <PlayerBar></PlayerBar>
    </div>
  );
};
export default App;
