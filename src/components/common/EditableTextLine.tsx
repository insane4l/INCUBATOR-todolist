import React, { ChangeEvent, useState } from 'react';

const EditableTextLine: React.FC<EditableTextLinePropsType> = ({text, setNewText}) => {

    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const onDoubleClickHandler = () => {
        setEditMode(true);
        setInputValue(text);
    }

    const onBlurHandler = () => {
        setEditMode(false);
        setNewText(inputValue);
    }

    return editMode 
        ? <input type="text" value={inputValue} onChange={onInputChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{text}</span>
    
}

export default EditableTextLine;

type EditableTextLinePropsType = {
    text: string
    setNewText: (newText: string) => void
}