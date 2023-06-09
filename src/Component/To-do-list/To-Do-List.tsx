import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType, TaskType } from "../Common/Types/TaskType";



type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError ] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.code === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() === ""){
        return setError("Title is required")
    }
        props.addTask(newTaskTitle.trim())
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
                    onKeyDown={onKeyDownHandler} 
                    className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
               {error && <div className="error-message" >{error}</div>} 
            </div >
            <ul >
                {props.tasks.map(t => {
                    const onRemoveHandler = () =>  props.removeTask(t.id) 
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>  props.changeStatus(t.id, e.currentTarget.checked)
                    return <li key={t.id} className={t.isDone ? "is-done" : ""} >
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                        </li>
                })
                }
            </ul>
            <div className="Button">
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler} >All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}  onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}  onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
