import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void

};
export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")


    const editModeOn = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const editModeOff = () => {
        setEditMode(false)
        props.onChange(title)

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input autoFocus onBlur={editModeOff} onChange={onChangeTitleHandler} value={title} className="input" />
        : <span onDoubleClick={editModeOn}  >{props.title}</span>
}
