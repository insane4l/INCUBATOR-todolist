import React from 'react';
import s from './SuperColorPicker.module.css';

type DefaultInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperColorPickerPropsType = DefaultInputType & {
    onColorChange?: (value: string) => void
    labelClassName?: string
    label?: string
}

const SuperColorPicker: React.FC<SuperColorPickerPropsType> = ({
    type, // so we cant change input type with component props
    onChange, onColorChange,
    className, 
    label, labelClassName,
    ...restProps
}) => {

    let bgc = restProps.value?.toString() || '#111111'

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);

        //__________________________________
        // HEX color validation for mobile browsers (on old phones/tablets) that dont support color palette
        let c = e.currentTarget.value;
        c = '0000000' + c;
        c = c.replace(/[^\dabcdef]/gi, '0');
        c = c.substring(c.length - 6);
        c = '#' + c;
        
        // input highlighting
        bgc = c;
        //__________________________________

        onColorChange && onColorChange(c);
    }

    const finalInputClassName = className ? `${s.colorpicker__input} ${className}` : s.colorpicker__input;

    let finalLabelClassName;
    if (label) finalLabelClassName = labelClassName ? `${s.colorpicker__label} ${labelClassName}` : s.colorpicker__label;

    return (
        <div className={s.colorpicker}>
            <input style={{background: bgc}} onChange={onChangeHandler} className={finalInputClassName} id="super_colorpicker" type="color" {...restProps}/>
            {label 
                && <label className={finalLabelClassName} htmlFor="super_colorpicker">
                    {label}
                </label> 
            }
        </div>
    )
}

export default SuperColorPicker;