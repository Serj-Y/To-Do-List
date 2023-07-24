import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { OwnTheme } from "../To-do-list/To-Do-List";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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
        <div >
            <ThemeProvider theme={OwnTheme}>
                <input
                    placeholder="..."
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? "error" : "input"} />
                <Button size="small" variant="contained" onClick={addTask}><AddOutlinedIcon/></Button>
                {error && <div className="error-message">{error}</div>}
            </ThemeProvider>
        </div>
    );
}



