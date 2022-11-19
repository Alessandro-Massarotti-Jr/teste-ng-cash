import ButtonSubmit from "../ButtonSubmit"
import InputSelect from "../Form/InputSelect"
import InputText from "../Form/InputText"
import styles from "./styles.module.css"

const options = [
    {
        value:"all",
        label:"Todos"
    },
    {
        value:"cashIn",
        label:"Creditado"
    },
    {
        value:"cashOut",
        label:"Debitado"
    }
]

export default function TransactionTable() {
    return (
        <>
        <form className={styles.filterForm}>
            <div>
            <InputText label="Data inicial" name="date_start" type="date"  placeholder="data inicial..." />
            <InputText label="Data final" name="date_end" type="date"  placeholder="data final..." />
            </div>
            <InputSelect options={options} label="Tipos de transação" name="transaction_types"/>
            <ButtonSubmit label="Filtrar" type="submit"/>
            <span>Por padrão o sistema carrega transações dos ultimos 30 dias</span>
        </form>
         <table className={styles.transactionTable}>
            <thead>
                <tr>
                    <th>Usuario creditado</th>
                    <th>Usuario debitado</th>
                    <th>valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alessandro</td>
                    <td>Maria Ana</td>
                    <td>R$ 200,00</td>
                </tr>
                <tr>
                    <td>Alessandro</td>
                    <td>Maria Ana</td>
                    <td>R$ 200,00</td>
                </tr>
                <tr>
                    <td>Alessandro</td>
                    <td>Maria Ana</td>
                    <td>R$ 200,00</td>
                </tr>
            </tbody>
        </table>
        </>
       
    )
}