import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType, TaskType } from "../Common/Types/TaskType";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.code === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler} />
                <button onClick={addTask}>+</button>
            </div >
            <ul >
                {props.tasks.map(t => {
                    const onRemoveHandler = () => { props.removeTask(t.id) }
                    return <li key={t.id}>
                        <input type="checkbox" defaultChecked={t.isDone} />
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                        </li>
                })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler} >All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
