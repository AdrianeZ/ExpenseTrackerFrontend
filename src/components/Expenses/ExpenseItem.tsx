import {Expense} from "../../../../ExpenseTrackerBackend/src/entities/Expense";
import {HttpMethod} from "types";
import "./ExpenseItem.css";
import {AiFillDelete} from "react-icons/ai"


interface Props {
    expense: Expense;
    updateExpenses: <U extends BodyInit>(url: string, method?: HttpMethod, requestBody?: U | undefined, headers?: HeadersInit | undefined) => Promise<void>;
}

const ExpenseItem = ({expense, updateExpenses}: Props) => {


    const removeExpense = async (id: string) => {
        const response = await fetch(`http://localhost:3001/api/expenses/${id}`, {
            method: "DELETE", headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.ok && response.status === 204) {
            updateExpenses("http://localhost:3001/api/expenses", HttpMethod.GET, undefined, {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            });
        }

    }

    return (
        <li className="expense-item">
           <span className="expense-item__indicator" style={{backgroundColor: expense.category.color}}>

           </span>

            <div className="expense-item__content">
                <span>{expense.name} </span>
                <span> {new Date(expense.createdAt).toLocaleString()}</span>
                <span>{expense.value}</span>

            </div>

            <AiFillDelete size={40}  cursor="pointer" onClick={() => removeExpense(expense.id)}>Delete</AiFillDelete>
        </li>
    );
};

export {ExpenseItem};