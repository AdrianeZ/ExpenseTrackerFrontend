import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {useFetch} from "../../hooks/useFetch";
import {HttpMethod} from "types";
import {CreateExpenseDto} from "../../../../ExpenseTrackerBackend/src/types/dto/expenses";
import {CreateExpenseResponse} from "../../../../ExpenseTrackerBackend/src/types/responses/expense";
import "./NewExpenseForm.css";
import {GetCategoriesResponse} from "../../../../ExpenseTrackerBackend/src/types/responses/category";

interface Props {
    updateExpenses: <U extends BodyInit>(url: string, method?: HttpMethod, requestBody?: U | undefined, headers?: HeadersInit | undefined) => Promise<void>;
}

const NewExpenseForm = ({updateExpenses} : Props) => {

    const [expense, setExpense] = useState<CreateExpenseDto>({name: "", value: 0, categoryId: ""});

    const updateExpenseForm = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setExpense(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    const {makeRequest} = useFetch<CreateExpenseResponse>();

    const {
        makeRequest: makeCategoryRequest,
        isLoading: isCategoryLoading,
        data: categoryData,
        error: categoryError
    } = useFetch<GetCategoriesResponse>();

    const submitExpenseForm = (e: SyntheticEvent) => {
        e.preventDefault();
        const url = "http://localhost:3001/api/expenses";
        const requestBody: CreateExpenseDto = {name: expense.name, value: expense.value, categoryId: expense.categoryId}
        makeRequest(url, HttpMethod.POST, JSON.stringify(requestBody), {Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type":"application/json"});
        setExpense({name: "", value: 0, categoryId: expense.categoryId});
        updateExpenses("http://localhost:3001/api/expenses", HttpMethod.GET, undefined, {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        })
    }


    useEffect(() => {
        if (!categoryData) {
            makeCategoryRequest("http://localhost:3001/api/categories", HttpMethod.GET, undefined, {Authorization: `Bearer ${localStorage.getItem("token")}`});
        }
        if (categoryData?.categories) {
            setExpense(prevState => ({...prevState, categoryId: categoryData.categories[0].id}))
        }
    }, [categoryData]);


    return (
        <section className="expense-form">
            <form onSubmit={submitExpenseForm}>
                <div className="form-control">
                    <label htmlFor="name">
                        <input type="text" required name="name" id="name" value={expense.name} placeholder="expense name"
                               onChange={updateExpenseForm}/>
                    </label>
                </div>
                <div className="form-control">
                    {categoryData && <label htmlFor="category">
                        <select name="categoryId" id="categoryId" value={expense.categoryId}
                                onChange={updateExpenseForm}>
                            {categoryData?.categories.map((category) =>
                                <option value={category.id} key={category.id}>{category.name} </option>
                            )}
                        </select>
                    </label>}
                    {!categoryData && categoryError && `Can't load category list ${categoryError}`}
                    {isCategoryLoading && <span>Fetching Categories</span> }
                </div>
                <div className="form-control">
                    <label htmlFor="value">
                        <input type="number" name="value" required id="value" value={expense.value} min="1" step="0.01"
                               onChange={updateExpenseForm}
                               placeholder="value"/>
                    </label>
                </div>

                <div className="form-control">
                    <label htmlFor="value">
                        <input type="submit" value="Add Expense"/>
                    </label>
                </div>
            </form>
        </section>
    );
};

export {NewExpenseForm};