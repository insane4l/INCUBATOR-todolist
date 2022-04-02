import React, { useState } from 'react';
import SuperColorPicker from '../common/SuperColorPicker/SuperColorPicker';
import { Box, Button, Divider, PaletteMode, Paper, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../bll/store';
import { ThemePaletteObjType, setThemePaletteAC, defaultLightTheme, defaultDarkTheme } from '../../bll/colorThemeReducer';
import s from './CustomPalette.module.css'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

const CustomPalette: React.FC<{hideCustomPalette: ()=>void}> = React.memo( ({hideCustomPalette}) => {
    // console.log('CustomPalette rendered');
    const dispatch = useDispatch()

    const currentColorMode = useSelector<AppStateType, PaletteMode>(state => state.colorTheme.currentColorMode);
    const modeObjPropName = currentColorMode === 'light' ? 'lightTheme' : 'darkTheme';
    const currentThemePalette = useSelector<AppStateType, ThemePaletteObjType>(state => state.colorTheme[modeObjPropName]);

    const [primaryColor, setPrimaryColor] = useState(currentThemePalette.primary.main);
    const [primaryContrast, setPrimaryContrast] = useState(currentThemePalette.primary.contrastText);
    const [secondaryColor, setSecondaryColor] = useState(currentThemePalette.secondary.main);
    const [secondaryContrast, setSecondaryContrast] = useState(currentThemePalette.secondary.contrastText);
    const [primaryTextColor, setPrimaryTextColor] = useState(currentThemePalette.text.primary);
    const [secondaryTextColor, setSecondaryTextColor] = useState(currentThemePalette.text.secondary);
    const [dividerElColor, setDividerElColor] = useState(currentThemePalette.divider);


    const cPickersArr = [
        {label: "Primary Color", value: primaryColor, callback: setPrimaryColor},
        {label: "Contrast 1 text", value: primaryContrast, callback: setPrimaryContrast, div: true},
        {label: "Secondary Color", value: secondaryColor, callback: setSecondaryColor},
        {label: "Contrast 2 text", value: secondaryContrast, callback: setSecondaryContrast, div: true},
        {label: "Text Primary", value: primaryTextColor, callback: setPrimaryTextColor},
        {label: "Text Secondary", value: secondaryTextColor, callback: setSecondaryTextColor, div: true},
        {label: "Divider Element", value: dividerElColor, callback: setDividerElColor},
    ]

    const onConfirmColorsHandler = () => {
        const palette = {
            primary: {
                main: primaryColor,
                contrastText: primaryContrast
            },
            secondary: {
                main: secondaryColor,
                contrastText: secondaryContrast
            },
            text: {
                primary: primaryTextColor,
                secondary: secondaryTextColor,
            },
            divider: dividerElColor
        }

        dispatch(setThemePaletteAC(currentColorMode, palette));
        hideCustomPalette();

        const palettePropName = currentColorMode === 'light' ? 'TL-app-light-theme' : 'TL-app-dark-theme';
        localStorage.setItem(palettePropName, JSON.stringify(palette));
    }

    const resetToDefaultColors = () => {
        let defaultThemePalette = defaultLightTheme;
        let palettePropName = 'TL-app-light-theme';

        if (currentColorMode === 'dark') {
            defaultThemePalette = defaultDarkTheme;
            palettePropName = 'TL-app-dark-theme';
        }

        dispatch(setThemePaletteAC(currentColorMode, defaultThemePalette));
        localStorage.removeItem(palettePropName);

        hideCustomPalette();
    }

    const paletteStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '10px',
        p: '20px',
        background: currentColorMode === 'light' ? '#eee' : '#111'
    }

    const colorPickersWrapperStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '13px',
        p: '10px 0'
    }

    const mappedColorPickers = cPickersArr.map((el, i) => (
        <>
            <SuperColorPicker 
                // key={el.label}
                autoFocus={i === 0}
                value={el.value}
                label={el.label}
                onColorChange={el.callback} />

            {el.div && <Divider />}
        </>
    ))

    return (
        <Paper className={s.custom_palette} elevation={10} sx={paletteStyle}>

            <Typography variant="h6" component="h6">
                {currentColorMode === 'light'
                    ? 'Light Theme Colors'
                    : 'Dark Theme Colors'
                }
            </Typography>
         
            <Box sx={colorPickersWrapperStyle}>
                {mappedColorPickers}
            </Box>

            <Button
                onClick={onConfirmColorsHandler}
                variant="contained" size="medium"
                color="primary"
                endIcon={<CheckIcon />}>
                    Set colors
            </Button>

            <Button
                onClick={resetToDefaultColors}
                variant="contained" size="medium"
                color="secondary"
                endIcon={<SettingsBackupRestoreIcon />}>
                    Reset to default
            </Button>
            
        </Paper>
    )
})

export default CustomPalette;