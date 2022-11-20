import { FormEvent, useEffect, useRef, useState } from "react"
import { filterInterface, TransactionDataInterface, TransactionService } from "../../services/TransactionService"
import ButtonSubmit from "../ButtonSubmit"
import InputSelect from "../Form/InputSelect"
import InputText from "../Form/InputText"
import styles from "./styles.module.css"
import moment from "moment"
import { AuthUserInterface, UserService } from "../../services/UserService"

const options = [
    {
        value: "all",
        label: "Todos"
    },
    {
        value: "cashIn",
        label: "Debitado"
    },
    {
        value: "cashOut",
        label: "Creditado"
    }
]

export default function TransactionTable() {

    const [tableData, setTableData] = useState<TransactionDataInterface[] | null[]>([]);
    const [dataFilter, setDataFilter] = useState<filterInterface>(
        {
            cashIn: true,
            cashOut: true,
            date_start: moment().subtract(30, 'd').format('YYYY-MM-DD'),
            date_end: moment().format('YYYY-MM-DD')
        }
    );

    const [authUser, setAuthUser] = useState<AuthUserInterface>({});

    const dateStartRef = useRef(moment().subtract(30, 'd').format('YYYY-MM-DD'));
    const dateEndRef = useRef(moment().format('YYYY-MM-DD'));
    const transactionTypeRef = useRef('all');

    async function getAuthUser() {
        const response = await UserService.authUser();
        setAuthUser(response)
    }

    async function getTransactionData() {
        const transactionData = await TransactionService.filter(dataFilter);
        setTableData(transactionData);
    }

    async function handleFilterSubmit(event: FormEvent) {
        event.preventDefault();

        const filter: filterInterface = {
            date_start: dateStartRef.current.value,
            date_end: dateEndRef.current.value,
            cashIn: false,
            cashOut: false,
        };

        if (transactionTypeRef?.current.value == "cashIn") {
            filter.cashIn = true;
        }
        if (transactionTypeRef.current.value == "cashOut") {
            filter.cashOut = true;
        }

        setDataFilter(filter);

        await getTransactionData();

    }

    useEffect(() => {
        getAuthUser()
        getTransactionData()
    }, []);

    return (
        <>
            <form onSubmit={(event) => handleFilterSubmit(event)} className={styles.filterForm}>
                <div>
                    <InputText ref={dateStartRef} label="Data inicial" name="date_start" type="date" placeholder="data inicial..." />
                    <InputText ref={dateEndRef} label="Data final" name="date_end" type="date" placeholder="data final..." />
                </div>
                <InputSelect ref={transactionTypeRef} options={options} label="Tipos de transação" name="transaction_types" />
                <ButtonSubmit label="Filtrar" type="submit" />
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
                    {tableData?.length > 0 ?
                        tableData.map((tData) => {
                            return (
                                <tr key={tData?.id}>
                                    <td>{tData?.credited_accounts.user.username}</td>
                                    <td>{tData?.debited_accounts.user.username}</td>
                                    <td className={authUser.id == tData?.credited_accounts.user.id ? styles.credited : styles.debited}>{new Intl.NumberFormat('pt-br', { style: "currency", currency: "BRL" }).format(authUser.id == tData?.credited_accounts.user.id ? tData?.value as number * (-1) : tData?.value as number)}</td>
                                </tr>
                            );
                        })
                        :
                        <tr>
                            <td></td>
                            <td className={styles.notfound}>Nenhum Registro encontrado</td>
                            <td></td>
                        </tr>
                    }

                </tbody>


            </table>
        </>

    )
}