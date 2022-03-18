import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTodoListForm from './AddTodoListForm';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material';
import { ColorModeContext } from '../contextAPI/ColorModeContext';


const AppHeader: React.FC<AppHeaderPropsType> = ({ addNewTodoList }) => {

    const [formDisplay, setFormDisplay] = useState(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

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

                    <Box sx={{ m: "0 0 0 auto" }}>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                        <Button color="inherit">Login</Button>
                    </Box>
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