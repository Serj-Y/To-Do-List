import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.code === "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            return setError("Title is required");
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("");
    };

    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : "Input"} />
            <button onClick={addTask}>+</button>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}



