import {Expense} from "../../../../ExpenseTrackerBackend/src/entities/Expense";
import "./ExpenseItem.css";


interface Props
{
    expense:Expense;
}

const ExpenseItem = ({expense}:Props) => {
    return (
       <li className="expense-item">
           <span className="expense-item__indicator" style={{backgroundColor:expense.category.color}}>

           </span>

           <div className="expense-item__content">
               <span>{expense.name} </span>
               <span> {new Date(expense.createdAt).toLocaleString()}</span>
               <span>{expense.value}</span>

           </div>

           <button>Delete</button>
       </li>
    );
};

export {ExpenseItem};