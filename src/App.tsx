import React from 'react';
import './App.css';
import { Todolist } from './Component/To-do-list/To-Do-List';



function  App () {
let task1 = [
  {id: 1, title: "CSS&HTML", isDone: true},
  {id: 2, title: "JS", isDone: true},
  {id: 3, title: "React", isDone: false},
]

let task2 = [
  {id: 1, title: "The Last Of Us", isDone: true},
  {id: 2, title: "The Last Of Us Part 2", isDone: true},
  {id: 3, title: "Tom Clancy's Ghost Recon WildLands ", isDone: false},
]

let task3 = [
  {id: 1, title: "Witcher", isDone: true},
  {id: 2, title: "The Last Of Us", isDone: true},
  {id: 3, title: "Wednesday", isDone: true},
]




  return (
    <div className="App">
      <Todolist title="What to learn" tasks={task1}  />
      <Todolist title="Games" tasks={task2} />
      <Todolist title="Moves" tasks={task3} />
    </div>
  );
}

export default App;
 