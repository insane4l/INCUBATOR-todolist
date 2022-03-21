import React, { useState } from 'react';
import SuperColorPicker from '../common/SuperColorPicker';
import { Button, Paper } from '@mui/material';

const CustomPalette = () => {

    // todo: create reducer
    const [primaryColor, setPrimaryColor] = useState('#fffaaa');
    const [secondaryColor, setSecondaryColor] = useState('#666666');
    const [primaryTextColor, setPrimaryTextColor] = useState('#666666');
    const [secondaryTextColor, setSecondaryTextColor] = useState('#666666');
    const [dividerElColor, setDividerElColor] = useState('#666666');

    // todo: map cPickers
    // const cPickersArr = [
    //     {label:, value:, callback:}
    // ]

    const paletteStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '10px',
        p: '20px 50px 20px 20px',

    }

    return (
        <Paper elevation={10} sx={paletteStyle}>
            <SuperColorPicker 
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
                label="Color of divider"/>


            <Button variant="contained" size="small" color="primary">Set colors</Button>
            <input type="color" />
        </Paper>
    )
}

export default CustomPalette;