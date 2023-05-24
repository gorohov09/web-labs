import ExpensModel from "../models/ExpensModel.js";

function GetExpenses (expensesData) {
    const expenses = [];

    expensesData.map(expense => {
        expenses.push({
            id: expense._id,
            value: expense.value,
            type: expense.category
        })
    })

    return expenses;
}

export const createExpens = async (req, res) => {
    try {
        console.log(req.body.category);
        console.log(req.body.value);

        const doc = new ExpensModel({
            category: req.body.category,
            value: req.body.value,
        });

        const expens = await doc.save();

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Не удалось добавить расходы",
        })
    }
}

export const getAll = async (req, res) => {

    try {
        let expenses = await ExpensModel.find().exec();

        res.json({statistics_category: GetExpenses(expenses)});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Не удалось получить лекарства",
        })
    }

}