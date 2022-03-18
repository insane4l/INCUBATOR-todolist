import TextField from '@mui/material/TextField';
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
        ? <TextField
            error={false} // todo: error
            label={"aaa"} // error || "Edit mode"
            variant="standard"
            value={inputValue}
            onChange={onInputChangeHandler}
            onBlur={onBlurHandler}
            autoFocus // todo: onKeyPress - set new value onEnter
        />

        : <span style={{wordBreak: 'break-word'}} onDoubleClick={onDoubleClickHandler}>{text}</span>
    
}

export default EditableTextLine;

type EditableTextLinePropsType = {
    text: string
    setNewText: (newText: string) => void
}