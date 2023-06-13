import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "../Common/Types/TaskType";
import { AddItemForm } from "../Common/AddItemForm";




type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

const addTask = (title: string) => {
    props.addTask(title, props.id)
}

    return (
        <div>
            <h1>{props.title} <button onClick={removeTodolist} >x</button> </h1>
            <AddItemForm  addItem={addTask} />
            <ul >
                {props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
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
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}


