import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "../Common/Types/TaskType";
import { AddItemForm } from "../Common/AddItemForm";
import { EditableSpan } from "./EditableSpan";




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
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id:string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    
    const changeTodolistTitle = (newTitle: string) => { props.changeTodolistTitle(props.id, newTitle) }
    const addTask = (title: string) => {props.addTask(title, props.id)}

    return (
        <div>
            <h1><EditableSpan title={props.title}  onChange={changeTodolistTitle} /> <button onClick={removeTodolist} >x</button> </h1>
            <AddItemForm addItem={addTask} />
            <ul >
                {props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.id)
                    const onChangeTitleHandler = (newValue: string) => { props.changeTaskTitle(t.id, newValue, props.id) }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""} >
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone} />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
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

