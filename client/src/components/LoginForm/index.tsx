import { Link } from "react-router-dom"
import ButtonSubmit from "../ButtonSubmit"
import InputText from "../Form/InputText"
import styles from "./styles.module.css"

export default function LoginForm() {

    return (
        <form className={styles.loginForm}>
            <InputText label="Nome de Usuario" name="username" placeholder="nome de usuario..." type="text" required />
            <InputText label="Senha" name="password" placeholder="senha..." type="text" required />
            <ButtonSubmit label="Login" type="submit" />
            <span>
            não possui uma conta <Link className={styles.loginForm__registerLink} to={"/register"}>Cadastre-se</Link>
            </span>
        </form>
    )
}