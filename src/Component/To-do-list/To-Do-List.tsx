import React from "react";
import { FilterValuesType, TaskType } from "../Common/Types/TaskType";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void

}

export function Todolist(props: PropsType) {
    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input />
                <button>+</button>
            </div >
            <ul >
                {props.tasks.map( t => <li key={t.id}>
                    <input type="checkbox"  defaultChecked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={()=>{ props.removeTask(t.id)}} >x</button></li>)}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")} >All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}
