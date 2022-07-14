import {ExpenseChart} from "../components/Expenses/ExpenseChart";
import {NewExpenseForm} from "../components/Forms/NewExpenseForm";
import {useEffect} from "react";
import {useFetch} from "../hooks/useFetch";
import {GetExpenseResponse} from "../../../ExpenseTrackerBackend/src/types/responses/expense";
import {HttpMethod} from "types";


const ExpenseView = () => {


    const {makeRequest, data} = useFetch<GetExpenseResponse>();


    useEffect(() => {
        console.log(localStorage.getItem("token"));
        makeRequest("http://localhost:3001/api/expenses", HttpMethod.GET, undefined, {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        })
    }, []);

    return (
        <>
            <NewExpenseForm updateExpenses={makeRequest}/>
            {data && <ExpenseChart expenses={data.expenses}/>}
        </>
    )
}


export {ExpenseView}