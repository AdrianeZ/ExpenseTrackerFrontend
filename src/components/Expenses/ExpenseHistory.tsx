import {Expense} from "../../../../ExpenseTrackerBackend/src/entities/Expense";
import {ExpenseItem} from "./ExpenseItem";
import "./ExpenseHistory.css";
import {HttpMethod} from "types";


interface Props {
    expenses: Expense[];
    updateExpenses: <U extends BodyInit>(url: string, method?: HttpMethod, requestBody?: U | undefined, headers?: HeadersInit | undefined) => Promise<void>;
}

const ExpenseHistory = ({expenses, updateExpenses}: Props) => {
    return (
        <section className="expense-history">
            <ul className="expense-history-list">
                {expenses.map((expense) => <ExpenseItem key={expense.id} updateExpenses={updateExpenses} expense={expense}/>)}
            </ul>
        </section>
    )
}

export {ExpenseHistory};