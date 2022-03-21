import React, { useEffect } from 'react';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material'
import { ColorModeContext } from './contextAPI/ColorModeContext';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { Provider } from 'react-redux';
import { store } from './bll/store';
import { grey } from '@mui/material/colors';

const AppContainer = () => {

    const [mode, setMode] = React.useState<PaletteMode | null>(null);

    useEffect(() => {
        const savedMode = localStorage.getItem('TL-app-color-mode') as PaletteMode;
        if (savedMode) setMode(savedMode);
        if (!savedMode) setMode('light')
    }, []);

    useEffect(() => {
        if (mode) localStorage.setItem('TL-app-color-mode', mode);
    }, [mode]);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo( () => createTheme({
        palette: {
            mode: mode || 'light',
            ...(mode === 'light'
                ? {
                    // palette values for light mode
                    primary: {
                        main: '#6b4efc',
                    },
                    secondary: {
                        main: '#8bc34a',
                        contrastText: '#fff'
                    },
                    divider: grey[300],
                    text: {
                        primary: grey[900],
                        secondary: grey[800],
                    },
                }
                : {
                    // palette values for dark mode
                    primary: {
                        main: '#8bc34a',
                        contrastText: '#fff'
                    },
                    secondary: {
                        main: '#8bc34a',
                        contrastText: '#fff'
                    },
                    divider: grey[800],
                }),
        },
    }), [mode], );


    return (
        !mode
            ? <CircularProgress sx={{ display: 'block', margin: '100px auto' }} />
            : <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Provider store={store}>
                        <App />
                    </Provider>
                </ThemeProvider>
            </ColorModeContext.Provider>
    );
}

export default AppContainer;