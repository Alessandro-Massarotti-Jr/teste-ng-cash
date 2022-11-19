import { Link } from "react-router-dom"
import ButtonSubmit from "../ButtonSubmit"
import InputText from "../Form/InputText"
import styles from "./styles.module.css"

export default function RegisterForm() {
    return (
        <form className={styles.registerForm}>
            <InputText label="Nome de Usuario" name="username" placeholder="nome de usuario..." type="text" required />
            <InputText label="Senha" name="password" placeholder="senha..." type="text" required />
            <ButtonSubmit label="Cadastrar" type="submit" />
            <span>
            ja possui uma conta faça <Link className={styles.registerForm__registerLink} to={"/login"}>Login</Link>
            </span>
        </form>
    )
}