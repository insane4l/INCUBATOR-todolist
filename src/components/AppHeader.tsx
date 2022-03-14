import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTodoListForm from './AddTodoListForm';


const AppHeader: React.FC<AppHeaderPropsType> = ({ addNewTodoList }) => {

    const [formDisplay, setFormDisplay] = useState(false)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="add new todo list"
                        onClick={() => setFormDisplay(!formDisplay)}
                    >
                        <AddCircleOutlineIcon fontSize='large' />
                    </IconButton>

                    <Button color="inherit" sx={{ m: "0 0 0 auto" }}>Login</Button>
                </Toolbar>
            </AppBar>

            {formDisplay && <AddTodoListForm addNewTodoList={addNewTodoList} /> }
        </>
    )
}

export default AppHeader;


type AppHeaderPropsType = {
    addNewTodoList: (title: string) => void
}