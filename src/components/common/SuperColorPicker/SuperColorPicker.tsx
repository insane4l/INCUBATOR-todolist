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


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);

        onColorChange && onColorChange(e.currentTarget.value);
    }

    const finalInputClassName = className ? `${s.colorpicker__input} ${className}` : s.colorpicker__input;

    let finalLabelClassName;
    if (label) finalLabelClassName = labelClassName ? `${s.colorpicker__label} ${labelClassName}` : s.colorpicker__label;

    return (
        <div className={s.colorpicker}>
            <input onChange={onChangeHandler} className={finalInputClassName} id="super_colorpicker" type="color" {...restProps}/>
            {label 
                && <label className={finalLabelClassName} htmlFor="super_colorpicker">
                    {label}
                </label> 
            }
        </div>
    )
}

export default SuperColorPicker;