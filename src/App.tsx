import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Component/To-do-list/To-Do-List";
import {
  FilterValuesType,
  TaskStateType,
} from "./Component/Common/Types/TaskType";
import { v1 } from "uuid";
import { TodolistType } from "./Component/Common/Types/TaskType";
import { AddItemForm } from "./Component/Common/AddItemForm";

function App() {
  function removeTask(id: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addItem(title: string, todolistId: string) {
    const task = { id: v1(), title, isDone: false };
    const tasks = tasksObj[todolistId];
    const newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function addTodolist(title: string) {
    const todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: [],
    });
  }

  const todolistId1 = v1();
  const todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: "CSS&HTML", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Phone", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });

  const removeTodolist = (todolistId: string) => {
    const filtredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filtredTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />

      {todolists.map((tl) => {
        let tasksForToDoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === false);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addItem}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
