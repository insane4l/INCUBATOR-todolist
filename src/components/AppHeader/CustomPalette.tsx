import React, { useState } from 'react';
import SuperColorPicker from '../common/SuperColorPicker';
import { Button, PaletteMode, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../bll/store';
import { PaletteObjType, setThemePaletteAC } from '../../bll/colorThemeReducer';
import s from './CustomPalette.module.css'

const CustomPalette: React.FC<{hideCustomPalette: ()=>void}> = ({hideCustomPalette}) => {

    const dispatch = useDispatch()

    const currentColorMode = useSelector<AppStateType, PaletteMode>(state => state.colorTheme.currentColorMode);
    const modeObjPropName = currentColorMode === 'light' ? 'lightTheme' : 'darkTheme';
    const currentThemePalette = useSelector<AppStateType, PaletteObjType>(state => state.colorTheme[modeObjPropName]);

    // todo: create reducer
    const [primaryColor, setPrimaryColor] = useState(currentThemePalette.primary.main);
    const [primaryContrast, setPrimaryContrast] = useState(currentThemePalette.primary.contrastText);
    const [secondaryColor, setSecondaryColor] = useState(currentThemePalette.secondary.main);
    const [secondaryContrast, setSecondaryContrast] = useState(currentThemePalette.secondary.contrastText);
    const [primaryTextColor, setPrimaryTextColor] = useState(currentThemePalette.text.primary);
    const [secondaryTextColor, setSecondaryTextColor] = useState(currentThemePalette.text.secondary);
    const [dividerElColor, setDividerElColor] = useState(currentThemePalette.divider);

    // todo: map cPickers
    const cPickersArr = [
        {label: "Primary color", value: primaryColor, callback: setPrimaryColor},
        {label: "Contrast1 text", value: primaryContrast, callback: setPrimaryContrast},
        {label: "Secondary color", value: secondaryColor, callback: setSecondaryColor},
        {label: "Contrast2 text", value: secondaryContrast, callback: setSecondaryContrast},
        {label: "Primary", value: primaryTextColor, callback: setPrimaryTextColor},
        {label: "Secondary", value: secondaryTextColor, callback: setSecondaryTextColor},
        {label: "Divider color", value: dividerElColor, callback: setDividerElColor},
    ]

    const paletteStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '10px',
        p: '20px 50px 20px 20px',
        background: currentColorMode === 'light' ? '#eee' : '#111'
    }

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

    return (
        <Paper className={s.custom_palette} elevation={10} sx={paletteStyle}>

            {cPickersArr.map(el => (
                <SuperColorPicker 
                    key={el.label}
                    value={el.value}
                    label={el.label}
                    onColorChange={el.callback} />
            ))}


            {/* <SuperColorPicker 
                value={primaryColor}
                label="Primary color" />

            <SuperColorPicker 
                value={secondaryColor}
                label="Secondary color"/>

            <SuperColorPicker 
                value={primaryTextColor}
                label="Primary text color"/>

            <SuperColorPicker 
                value={secondaryTextColor}
                label="Secondary text color"/>

            <SuperColorPicker 
                value={dividerElColor}
                label="Color of divider"/> */}


            <Button
                onClick={onConfirmColorsHandler}
                variant="contained" size="small"
                color="primary"
                endIcon={<CheckIcon />}>
                    Set colors
            </Button>
            
            <input type="color" />
        </Paper>
    )
}

export default CustomPalette;