import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css"

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label:string;
}

export default function ButtonSubmit({label , ...rest}:ButtonSubmitProps){
    return(
        <button className={styles.buttonSubmit} {...rest}>{label}</button>
    )
}