import styles from "./styles.module.css"
import logoNgCashBranco from "../../assets/logo-ngcash-branco.svg"
import TransactionTable from "../../components/TransactionTable"
import { Icon } from '@iconify/react';
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    function handleLogout(){
        AuthService.logout().then(response =>
            navigate('/login',{replace:true})

        )
    }

    return (
        <div className={styles.home}>
            <div className={styles.infoContainer}>
                <header className={styles.infoContainer__header}>
                    <div className={styles.header__logo}>
                        <img src={logoNgCashBranco} alt="Logo ng cash" />
                    </div>
                    <div className={styles.header__info}>
                        <h1 className={styles.header__title}>Transações</h1>
                        <span onClick={handleLogout} className={styles.header__logout}>Logout</span>
                    </div>

                </header>
                <div className={styles.infoContainer__userData}>
                    <div className={styles.userData__userInfo}>
                        <Icon width={40} icon="bi:people-circle" />
                        <h2 className={styles.userInfo__username}>Username</h2>
                    </div>
                    <div className={styles.userData__accountInfo}>
                        <span className={styles.accountInfo__accontValue}>R$ 300,00</span>
                        <span className={styles.accountInfo__description}>Saldo atual</span>
                    </div>
                </div>
                <hr className={styles.infoContainer__separator} />
                <TransactionTable />
            </div>
        </div>
    )
}