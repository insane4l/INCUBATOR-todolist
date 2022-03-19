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
import Grow from '@mui/material/Grow';
import Collapse from '@mui/material/Collapse';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SpeedDialMenu from './SpeedDialMenu';
import Tooltip from '@mui/material/Tooltip';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';



const AppHeader: React.FC<AppHeaderPropsType> = ({ addNewTodoList }) => {

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const [formDisplay, setFormDisplay] = useState(false);
    let [collapseStatus, setCollapseStatus] = useState(true);


    const toggleFormDisplay = () => {
        setFormDisplay(prevStatus => !prevStatus)
    }
    const toggleCollapseStatus = () => {
        setCollapseStatus(prevStatus => !prevStatus)
    }

    const addListFormStyle = {
        position: 'absolute',
        left: '30px',
        zIndex: 22,
        transform: formDisplay ? 'translateY(0)' : 'translateY(-140%)',
        opacity: formDisplay ? '1' : '0',
        transition: 'all .3s ease'
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <LeftMenu 
                        toggleFormDisplay={toggleFormDisplay}
                        collapseStatus={collapseStatus}
                        toggleCollapseStatus={toggleCollapseStatus}/>
                    {/* <SpeedDialMenu /> */}

                    <Box sx={{ m: "0 0 0 auto" }}>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Box>
                </Toolbar>
            </AppBar>


            <Box sx={addListFormStyle}>
                <AddTodoListForm addNewTodoList={addNewTodoList} />
            </Box>
        </>
    )
}



type LeftMenuPropsType= {
    toggleFormDisplay: () => void
    toggleCollapseStatus: () => void
    collapseStatus: boolean
}

const LeftMenu: React.FC<LeftMenuPropsType> = ({toggleFormDisplay, toggleCollapseStatus, collapseStatus}) => {
    return (
        <>
            <LeftMenuButton descr='Add new list' onClick={toggleFormDisplay}>
                <AddCircleOutlineIcon fontSize='medium' />
            </LeftMenuButton>
            {collapseStatus
                    ?   <LeftMenuButton descr='Uncollapse all' onClick={toggleCollapseStatus}>
                            <InstallDesktopIcon fontSize='medium' />
                        </LeftMenuButton>

                    :   <LeftMenuButton descr='Collapse all' onClick={toggleCollapseStatus}>
                            <RemoveFromQueueIcon fontSize='medium' />
                        </LeftMenuButton>
            }
        </>
    )
}



type LeftMenuButtonPropsType ={
    descr: string
    onClick: () => void
}

const LeftMenuButton: React.FC<LeftMenuButtonPropsType> = ({ descr, onClick, children }) => {
    return (
        <Tooltip title={descr}>
            <IconButton
                size="large"
                color="inherit"
                aria-label="add new todo list"
                onClick={onClick}
            >
                {children}

            </IconButton>
        </Tooltip>
    )
}



export default AppHeader;


type AppHeaderPropsType = {
    addNewTodoList: (title: string) => void
}