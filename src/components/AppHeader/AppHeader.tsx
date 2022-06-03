import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTodoListForm from '../AddTodoListForm/AddTodoListForm';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import { useDispatch, useSelector } from 'react-redux';
import { collapseAllTodoListsAC, uncollapseAllTodoListsAC } from '../../bll/todoListsReducer';
import PaletteIcon from '@mui/icons-material/Palette';
import CustomPalette from '../CustomPalette/CustomPalette';
import { setColorModeAC } from '../../bll/colorThemeReducer';
import ProgressBar from './ProgressBar/ProgressBar';
import { AppRootStateType } from '../../bll/store';


type AppHeaderPropsType = {isAuth: boolean}

const AppHeader: React.FC<AppHeaderPropsType> = React.memo( ({isAuth}) => {
    // console.log('AppHeader rendered');

    const appRequestStatus = useSelector<AppRootStateType>(state => state.app.appRequestStatus);
    const isLoading = (appRequestStatus === 'loading');

    const [formDisplay, setFormDisplay] = useState(false);
    const [paletteDisplay, setPaletteDisplay] = useState(false);

    const toggleFormDisplay = () => {
        setFormDisplay(prevStatus => !prevStatus)
    }
    const hideNewTodoListForm = () => {
        setFormDisplay(false)
    }

    const togglePaletteDisplay = () => {
        setPaletteDisplay(prevStatus => !prevStatus)
    }
    const hideCustomPalette = () => {
        setPaletteDisplay(false)
    }


    // enableColorOnDark prop = colored header on dark theme on
    return (
        <>
            <AppBar position="relative" color="primary" >
                <Toolbar>
                    { isAuth && <LeftMenu 
                        toggleFormDisplay={toggleFormDisplay}/>
                    }

                    
                    <RightMenu 
                        isAuth={isAuth}
                        togglePaletteDisplay={togglePaletteDisplay}
                        hideCustomPalette={hideCustomPalette} />

                </Toolbar>
                {isLoading && <ProgressBar />}

                {formDisplay 
                    && <AddTodoListForm hideNewTodoListForm={hideNewTodoListForm}/>}



                {paletteDisplay 
                    && <CustomPalette hideCustomPalette={hideCustomPalette} />}


            </AppBar>


            

            
        </>
    )
});



type LeftMenuPropsType= {
    toggleFormDisplay: () => void
}

const LeftMenu: React.FC<LeftMenuPropsType> = ({toggleFormDisplay}) => {

    const dispatch = useDispatch()
    let [collapseStatus, setCollapseStatus] = useState(true);

    const collapseAllTodoLists = () => {
        dispatch(collapseAllTodoListsAC() )
        setCollapseStatus(true);
    }
    const uncollapseAllTodoLists = () => {
        dispatch(uncollapseAllTodoListsAC() )
        setCollapseStatus(false);
    }

    return (
        <>
            <MenuButton descr='Add new list' onClick={toggleFormDisplay}>
                <AddCircleOutlineIcon fontSize='medium' />
            </MenuButton>
            {collapseStatus
                    ?   <MenuButton descr='Uncollapse all' onClick={uncollapseAllTodoLists}>
                            <InstallDesktopIcon fontSize='medium' />
                        </MenuButton>

                    :   <MenuButton descr='Collapse all' onClick={collapseAllTodoLists}>
                            <RemoveFromQueueIcon fontSize='medium' />
                        </MenuButton>
            }
        </>
    )
}



type RightMenuPropsType= {
    isAuth: boolean
    togglePaletteDisplay: () => void
    hideCustomPalette: () => void
}

const RightMenu: React.FC<RightMenuPropsType> = ({isAuth, togglePaletteDisplay, hideCustomPalette}) => {

    const theme = useTheme();
    const dispatch = useDispatch();

    const setLightColorMode = () => {
        dispatch(setColorModeAC('light') );
        hideCustomPalette();
    }
    const setDarkColorMode = () => {
        dispatch(setColorModeAC('dark') );
        hideCustomPalette();
    }

    return (
        <Box sx={{ m: "0 0 0 auto" }}>
            <MenuButton descr='Set custom palette' onClick={togglePaletteDisplay}>
                <PaletteIcon />
            </MenuButton>

            {theme.palette.mode === 'dark'
                ?   <MenuButton descr='Swith to light mode' onClick={setLightColorMode}>
                        <Brightness4Icon />
                    </MenuButton>
                :   <MenuButton descr='Swith to dark mode' onClick={setDarkColorMode}>
                        <Brightness7Icon />
                    </MenuButton>
            }

            {isAuth
                ? <Button color="inherit">Logout</Button>
                : <Button color="inherit">Login</Button>
            }
        </Box>
    )
}



type MenuButtonPropsType ={
    descr: string
    onClick: () => void
}

const MenuButton: React.FC<MenuButtonPropsType> = ({ descr, onClick, children }) => {
    return (
        <Tooltip title={descr}>
            <IconButton
                size="large"
                color="inherit"
                aria-label={descr}
                onClick={onClick}
            >
                {children}

            </IconButton>
        </Tooltip>
    )
}



export default AppHeader;