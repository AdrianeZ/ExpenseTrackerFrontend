import 'chart.js/auto';
import {Pie} from "react-chartjs-2";
import {Expense} from "../../../../ExpenseTrackerBackend/src/entities/Expense";
import "./ExpenseChart.css";



interface Props {
    expenses: any;
}

type Iterable = {
    [key: string]: number;
}


const transformChartData = (expenseData: Expense[]): { mapper:Iterable, colors: string[] } => {
    const colors =  [...new Set(expenseData.map(expense => expense.category.color))];
    const mapper: Iterable = {};

    for (const expense of expenseData) {
        mapper[expense.category.name] = mapper[expense.category.name] || 0;
        mapper[expense.category.name] += Number(expense.value);
    }
    return {mapper, colors};
}

const ExpenseChart = (props: Props) => {

    const data = transformChartData(props.expenses);

    console.log(data);

    const chartData =
        {
            labels: Object.keys(data.mapper),
            datasets:[
                {
                    label:"Your Expenses",
                    data: Object.values(data.mapper),
                    backgroundColor: data.colors,
                    borderWidth:2,
                    borderColor:"#1B2430",
                    borderRadius: 3,
                    weight:6,
                    hoverOffset:3
                }
            ]
        }

    return (
        <section className="expense-chart">
            <Pie data={chartData} options={{maintainAspectRatio: false, plugins:{legend:{labels:{font:{size:25}, color:"white"} }}}}></Pie>
        </section>);

}

export {ExpenseChart};