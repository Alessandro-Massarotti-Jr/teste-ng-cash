import styles from "./styles.module.css"
import logoNgCashBranco from "../../assets/logo-ngcash-branco.svg"
import TransactionTable from "../../components/TransactionTable"
import { Icon } from '@iconify/react';
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDataInterface, UserService } from "../../services/UserService";
import Loading from "../../components/Loading";
import { AccountService, authUserAccountInterface } from "../../services/AccountService";

export default function Home() {

    const [authUser, setAuthUser] = useState<Omit<UserDataInterface, 'password'>>({ username: 'username' });
    const [authUserAccount, setAuthUserAccount] = useState<authUserAccountInterface>({
        balance:0,
        id:''
    });
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    function handleLogout() {
        AuthService.logout().then(response =>
            navigate('/login', { replace: true })
        )
    }

    async function getAuthUser() {
        const user = await UserService.authUser();
        setAuthUser(user)
    }

    async function getAuthUserAccount() {
        const account = await AccountService.authUserAccount();
        setAuthUserAccount(account)
    }

    async function handleApi() {
        await getAuthUser();
        await getAuthUserAccount()
        setIsLoading(false);
    }


    useEffect(() => {
        handleApi();
    }, []);

    return (
        <div className={styles.home}>
            {isLoading ? <Loading /> :
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
                            <h2 className={styles.userInfo__username}>{authUser.username}</h2>
                        </div>
                        <div className={styles.userData__accountInfo}>
                            <span className={styles.accountInfo__accontValue}>{new Intl.NumberFormat('pt-br',{style:"currency",currency:"BRL"}).format(authUserAccount.balance)}</span>
                            <span className={styles.accountInfo__description}>Saldo atual</span>
                        </div>
                    </div>
                    <hr className={styles.infoContainer__separator} />
                    <TransactionTable />
                </div>}

        </div>
    )
}