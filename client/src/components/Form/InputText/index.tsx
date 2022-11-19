import { forwardRef, InputHTMLAttributes, LegacyRef } from "react";
import styles from "./styles.module.css";


interface InputTextProps extends InputHTMLAttributes<HTMLInputElement>{
label:string;
}

const InputText = forwardRef(({ name, type, placeholder, required, label, ...rest }:InputTextProps, ref) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputContainer__label} htmlFor={name}>{label}</label>
            <input className={styles.inputContainer__input} ref={ref as LegacyRef<HTMLInputElement>} required={required} type={type} name={name} id={name} placeholder={placeholder} {...rest}/>
        </div>
    );
});

export default InputText;