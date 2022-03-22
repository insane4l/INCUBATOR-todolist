import { PaletteMode } from "@mui/material"

let initialState = {
    lightTheme: {
        primary: {
            main: '#6b4efc',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#8bc34a',
            contrastText: '#ffffff'
        },
        text: {
            primary: '#212121',
            secondary: '#424242',
        },
        divider: '#e0e0e0'
    },
    darkTheme: {
        primary: {
            main: '#8bc34a',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#8bc34a',
            contrastText: '#ffffff'
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        },
        divider: '#424242'
    },

    currentColorMode: 'light' as PaletteMode
}

export type PaletteObjType = typeof initialState.lightTheme
export type ColorThemeStateType = typeof initialState

const colorThemeReducer = (state: ColorThemeStateType = initialState, action: ColorThemeActionsType): ColorThemeStateType => {
    // debugger;
    switch(action.type) {
        case 'tl/COLOR-THEME/SET-COLOR-MODE': 
            return {
                ...state,
                currentColorMode: action.payload.mode
            }
        case 'tl/COLOR-THEME/SET-CUSTOM-PALETTE': 
            return {
                ...state,
                [action.payload.mode === 'light' ? 'lightTheme' : 'darkTheme']: action.payload.paletteObj
            }
        default: return state;
    }
}


type ColorThemeActionsType = ReturnType<typeof setColorModeAC> 
| ReturnType<typeof setThemePaletteAC> 



export const setColorModeAC = (mode: PaletteMode) => (
    {type: 'tl/COLOR-THEME/SET-COLOR-MODE', payload: {mode}} as const
)
export const setThemePaletteAC = (mode: PaletteMode, paletteObj: PaletteObjType) => (
    {type: 'tl/COLOR-THEME/SET-CUSTOM-PALETTE', payload: {mode, paletteObj} } as const
)





export default colorThemeReducer;