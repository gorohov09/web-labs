import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoose from 'mongoose';
import {ExpensController} from './controllers/controller.js';

const port = 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
    .connect('mongodb://127.0.0.1:27017/db-web-lab')
    .then(() => {   console.log('DB ok')})
    .catch((err) => {console.log('DB error', err)});

//Объект для хранения расходов и доходов 
const repository = {
    data: [
    ]
}

const category = {
    "statistics_category": [
        {
            "type": "Спорт",
            "value": 800 
        },
        {
            "type": "Еда",
            "value": 800 
        },
        {
            "type": "Игры",
            "value": 800 
        }
    ]
}

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('/category', ExpensController.getAll);
app.post("/enter", ExpensController.createExpens);
app.post("/deleteExpense", ExpensController.remove);
app.post("/putExpense", ExpensController.update);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
