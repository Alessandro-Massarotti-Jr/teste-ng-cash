import styles from "./styles.module.css"
import logoNgCashBranco from "../../../assets/logo_ng_cash-gif.gif"
import LoginForm from "../../../components/LoginForm";

export default function Login() {
    return (
        <div className={styles.login}>
            <div className={styles.infoContainer}>
                <header className={styles.infoContainer__header}>
                    <div className={styles.header__logo}>
                        <img src={logoNgCashBranco} alt="Logo ng cash" />
                    </div>
                    <h1 className={styles.header__title}>Login</h1>
                </header>
                <LoginForm />
            </div>
        </div>
    )
}