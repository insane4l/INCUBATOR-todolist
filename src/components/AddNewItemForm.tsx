import React, { ChangeEvent, KeyboardEvent, useState } from 'react';


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
            <input value={newItemTitle}
                   onChange={onInputChange}
                   onKeyPress={onKeyPressHandler}
                   className={validationError ? "validation__error-input" : ""} />
            <button onClick={onSubmitHandler}>+</button>

            {validationError
                && <div className="validation__error-title">{validationError}</div>
            }
        </div>
    )
}

export default AddNewItemForm;


type AddNewItemFormPropsType = {
    addItem: (itemTitle: string) => void
}