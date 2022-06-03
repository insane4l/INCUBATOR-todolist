import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../src/bll/store';
import { setColorModeAC, setThemePaletteAC } from '../src/bll/colorThemeReducer';
import { PaletteMode } from '@mui/material'
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

export const MuiThemeAppDecorator = (Story: React.ComponentType) => {
     
    const dispatch = useDispatch();
    const mode = useSelector<AppRootStateType, PaletteMode>((state) => state.colorTheme.currentColorMode);
    const lightTheme = useSelector((state: AppRootStateType) => state.colorTheme.lightTheme);
    const darkTheme = useSelector((state: AppRootStateType) => state.colorTheme.darkTheme);

    useEffect(() => {
        const savedMode = localStorage.getItem('TL-app-color-mode') as PaletteMode;
        let colorMode = savedMode || mode;
        dispatch( setColorModeAC(colorMode) );

        const savedLightTheme = localStorage.getItem('TL-app-light-theme');
        const savedDarkTheme = localStorage.getItem('TL-app-dark-theme');

        if (savedLightTheme) dispatch( setThemePaletteAC('light', JSON.parse(savedLightTheme)) )
        if (savedDarkTheme) dispatch( setThemePaletteAC('dark', JSON.parse(savedDarkTheme)) )
    }, []);

    useEffect(() => {
        if (mode) localStorage.setItem('TL-app-color-mode', mode);
    }, [mode]);

    const theme = createTheme({
        palette: {
            mode: mode,
            ...(mode === 'light'
                ? lightTheme
                : darkTheme),
        },
    })

    

    return (
        !mode
            ?   <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />
            :   <Emotion10ThemeProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Story />
                    </ThemeProvider>
                </Emotion10ThemeProvider>
        
    );
}