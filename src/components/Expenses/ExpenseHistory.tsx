import {Expense} from "../../../../ExpenseTrackerBackend/src/entities/Expense";
import {ExpenseItem} from "./ExpenseItem";
import "./ExpenseHistory.css";

interface Props {
    expenses: Expense[]
}

const ExpenseHistory = ({expenses}: Props) => {
    return (
        <section className="expense-history">
            <ul className="expense-history-list">
                {expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense}/>)}
            </ul>
        </section>
    )
}

export {ExpenseHistory};