import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthService } from "../../services/AuthService"
import ButtonSubmit from "../ButtonSubmit"
import InputText from "../Form/InputText"
import Loading from "../Loading"
import styles from "./styles.module.css"

export default function LoginForm() {

    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        AuthService.login({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }).then((response) => {
            setIsLoading(false)
            navigate('/',{replace:true})
    });

    }

    return (
        <form onSubmit={event => handleFormSubmit(event)} className={styles.loginForm}>
            {isLoading && <Loading />}
            <InputText ref={usernameRef} label="Nome de Usuario" name="username" placeholder="nome de usuario..." type="text" required />
            <InputText ref={passwordRef} label="Senha" name="password" placeholder="senha..." type="password" required />
            <ButtonSubmit label="Login" type="submit" />
            <span>
                não possui uma conta <Link className={styles.loginForm__registerLink} to={"/register"}>Cadastre-se</Link>
            </span>
        </form>
    )
}