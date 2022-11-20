import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionService } from "../../services/TransactionService";
import ButtonSubmit from "../ButtonSubmit";
import InputText from "../Form/InputText";
import styles from "./styles.module.css"

export default function CashOutModal() {

    const [isModalOpen,setIsModalOpen] = useState(false);

    const usernameRef = useRef('');
    const valueRef = useRef(0);
    const navigate = useNavigate();

    async function handleFormSubmit(event :FormEvent){
        event.preventDefault();
        await TransactionService.cashOut({cashInUser:usernameRef.current.value,value:valueRef.current.value});
        navigate(0)
    }

    return (
        <div className={styles.buttonContainer}>
            <ButtonSubmit onClick={()=>{setIsModalOpen(true)}} label="Cash Out" />
            {isModalOpen &&
            <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h2>Realizar transferencia</h2>
                <form onSubmit={(event)=>{handleFormSubmit(event)}} className={styles.cashOutForm}>
                    <InputText ref={usernameRef} label="Nome de Usuario" name="username" placeholder="nome de usuario..." type="text" required />
                    <InputText ref={valueRef} label="Valor da transferência" name="value" placeholder="valor da transferencia..." type="number" required />
                    <div className={styles.cashOutForm__button}>
                    <ButtonSubmit onClick={()=>{setIsModalOpen(false)}} label="fechar" />
                    <ButtonSubmit label="Enviar" />
                    </div>
                </form>
            </div>
        </div>
            }
        </div>
    )
}