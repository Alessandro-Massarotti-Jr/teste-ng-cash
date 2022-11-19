import { FormEvent, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { UserService } from "../../services/UserService"
import ButtonSubmit from "../ButtonSubmit"
import InputText from "../Form/InputText"
import Loading from "../Loading"
import styles from "./styles.module.css"

export default function RegisterForm() {

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    const [isLoading, setIsLoading] = useState(false);

    function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        UserService.store({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }).then(response =>
            setIsLoading(false)
        );

    }

    return (
        <form onSubmit={event => handleFormSubmit(event)} className={styles.registerForm}>
            {isLoading && <Loading />}
            <InputText ref={usernameRef} label="Nome de Usuario" name="username" placeholder="nome de usuario..." type="text" required />
            <InputText ref={passwordRef} label="Senha" name="password" placeholder="senha..." type="password" required />
            <ButtonSubmit label="Cadastrar" type="submit" />
            <span>
            ja possui uma conta faça <Link className={styles.registerForm__registerLink} to={"/login"}>Login</Link>
            </span>
        </form>
    )
}