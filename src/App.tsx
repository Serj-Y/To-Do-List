import React, { useState } from 'react';
import "./App.css";
import { Todolist } from "./Component/To-do-list/To-Do-List";
import { FilterValuesType, TaskType } from './Component/Common/Types/TaskType';
import { v1 } from 'uuid';
function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS&HTML", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);

let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id)
    setTasks(filteredTasks)
  }
  

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

 let tasksForToDoList = tasks;
 if (filter === "completed") {
  tasksForToDoList = tasks.filter(t => t.isDone  === true)
 }
 if (filter === "active") {
  tasksForToDoList = tasks.filter(t => t.isDone  === false)
 }


  return (
    <div className="App">
      <Todolist 
      title="What to learn" 
      tasks={tasksForToDoList} 
      removeTask={removeTask} 
      changeFilter={changeFilter} />
    </div>
  );
}

export default App;
