import { forwardRef, InputHTMLAttributes, LegacyRef } from "react";
import styles from "./styles.module.css";


interface optionElementInterface {
    value:string;
    label:string;
}

interface InputSelectProps extends InputHTMLAttributes<HTMLSelectElement>{
label:string;
options: optionElementInterface[];
}

const InputSelect = forwardRef(({ name, type, placeholder, required, label,options, ...rest }:InputSelectProps, ref) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer__label} htmlFor={name}>{label}</label>
            <select className={styles.inputContainer__input} name={name} id={name} ref={ref as LegacyRef<HTMLSelectElement>} {...rest}>
             {options.map((option)=>{
                return <option value={option.value}>{option.label}</option>
             })}
            </select>
        </div>
    );
});


export default InputSelect;