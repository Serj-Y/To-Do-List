import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "../Common/Types/TaskType";
import { AddItemForm } from "../Common/AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, createTheme } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';



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
    changeTodolistTitle: (newTitle: string, id: string) => void
}

export const OwnTheme = createTheme({
    components: {
        // Name of the component
        MuiRadio: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: "aliceblue",
                    "margin-left": "10px"
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "aliceblue",
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "minWidth": "40px",
                    color: "aliceblue"
                },
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    alignItems: "center"
                }
            }
        }
    },
});

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const changeTodolistTitle = (newTitle: string) => { props.changeTodolistTitle(props.id, newTitle) }
    const addTask = (title: string) => { props.addTask(title, props.id) }

    return (
        <div>
            <ThemeProvider theme={OwnTheme}>
                <FormControl >
                    <h2><EditableSpan title={props.title} onChange={changeTodolistTitle} /> <Button size="small" variant="outlined" onClick={removeTodolist} ><ClearOutlinedIcon  /></Button> </h2>
                    <AddItemForm addItem={addTask} />
                    <div >
                        {props.tasks.map(t => {
                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                            const onChangeTitleHandler = (newValue: string) => { props.changeTaskTitle(t.id, newValue, props.id) }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)

                            return <div key={t.id} >
                                <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={onChangeStatusHandler} checked={t.isDone} />
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                                <Button size="small" variant="outlined"  onClick={onRemoveHandler}><ClearOutlinedIcon  /></Button>
                            </div>
                        })}
                    </div>
                    <RadioGroup defaultValue="all" name="radio-buttons-group" row>
                        <FormControlLabel value="all" control={<Radio onChange={onAllClickHandler} />} label="All" />
                        <FormControlLabel value="active" control={<Radio onChange={onActiveClickHandler} />} label="Active" />
                        <FormControlLabel value="completed" control={<Radio onChange={onCompletedClickHandler} />} label="Completed" />
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}

