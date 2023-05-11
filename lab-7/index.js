import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const port = 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.get('/category', (req, res) => {
    res.json(category);
});

app.post('/enter', (req, res) => {
    const data = req.body;
    data.value = +data.value;
    repository.data.push(data);

    console.log(repository);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
