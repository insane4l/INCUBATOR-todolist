import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { DoorBack } from '@mui/icons-material';
import Button from '@mui/material/Button';


const AddNewItemForm: React.FC<AddNewItemFormPropsType> = ({ addItem }) => {

    const [newItemTitle, setNewItemTitle] = useState<string>('');
    const [validationError, setValidationError] = useState<string | null>(null)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
        setValidationError(null);
    }

    const onSubmitHandler = () => {
        if (newItemTitle.trim() === '') {
            setValidationError('Field is required');
            setNewItemTitle('');
            return;
        }

        setValidationError(null);
        addItem(newItemTitle.trim());
        setNewItemTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onSubmitHandler();
        }
    }

    return (
        <div>

            <TextField
                error={!!validationError}
                label="Title"
                value={newItemTitle}
                onChange={onInputChange}
                onKeyPress={onKeyPressHandler}
                helperText={validationError}
                sx={{width: '100%', mt: '33px'}}
            />

            <Button variant="contained" onClick={onSubmitHandler} sx={{width: '100%', mt: '6px', mb: '22px'}}>
                <AddIcon />
            </Button>
            {/* <IconButton  aria-label="delete" sx={{display: 'block', width: '100%'}}>
                <AddIcon />
            </IconButton> */}
        </div>
    )
}

export default AddNewItemForm;


type AddNewItemFormPropsType = {
    addItem: (itemTitle: string) => void
}