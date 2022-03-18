import React, { useEffect } from 'react';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {PaletteMode} from '@mui/material'
import { ColorModeContext } from './contextAPI/ColorModeContext';
import CssBaseline from '@mui/material/CssBaseline';

const AppContainer = () => {
    
    const [mode, setMode] = React.useState<PaletteMode>('light');

    useEffect(() => {
        const savedMode = localStorage.getItem('TL-app-color-mode') as PaletteMode;
        if (savedMode) setMode(savedMode)
    }, [])

    useEffect(() => {
        localStorage.setItem('TL-app-color-mode', mode)
    }, [mode])

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default AppContainer;