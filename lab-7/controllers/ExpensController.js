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
            msg: "Не удалось получить записи",
        })
    }

}

export const remove = (req, res) => {
    try {
        const expenseId = req.body.id;

        ExpensModel.findOneAndDelete({
            _id: expenseId,
        }).then(
            (doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Запись не найдена',
                    });
                }
                res.json({
                    success: true,
                });
            })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Не удалось удалить запись",
        })
    }
};

export const update = async (req, res) => {
    try {
        const expenseId = req.body.id;
        console.log(req.body);

        const doc = await ExpensModel.findOne({_id: expenseId})

        if (!doc) {
            return res.status(404).json({
                msg: 'Запись не найдена',
            });
        }

        await ExpensModel.updateOne(
            {
                _id: expenseId,
            },
            {
                value: req.body.newValue
            },
        );

        res.json({
            success: true,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Не удалось обновить запись",
        })
    }
}