import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';

const EditableTextLine: React.FC<EditableTextLinePropsType> = React.memo( ({text, setNewText, disabled = false}) => {
    // console.log('EditableTextLine rendered');
    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [validationError, setValidationError] = useState(false);

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const onDoubleClickHandler = () => {
        if (disabled) return

        setEditMode(true);
        setInputValue(text);
    }

    const onTextSubmit = () => {
        setValidationError(false)

        let value = inputValue.trim();

        if (value === '') {
            setValidationError(true);
            setInputValue('');
            return;
        }

        setEditMode(false);
        setNewText(value);
    }

    const onBlurHandler = () => {
        onTextSubmit();
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onTextSubmit();
        }
    }

    return editMode 
        ? <TextField
            error={validationError}
            helperText={'Field is required'}
            label={'Set title'}
            variant="standard"
            value={inputValue}
            onChange={onInputChangeHandler}
            onBlur={onBlurHandler}
            onKeyPress={onKeyPressHandler}
            autoFocus
            disabled={disabled}
        />

        : <span style={{display: 'inline-block', width: '100%', wordBreak: 'break-word'}} onDoubleClick={onDoubleClickHandler}>{text}</span>
    
})

export default EditableTextLine;

type EditableTextLinePropsType = {
    text: string
    setNewText: (newText: string) => void
    disabled?: boolean
}