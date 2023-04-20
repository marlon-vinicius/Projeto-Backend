const express = require("express");
const app = express();
app.use(express.json())

app.listen(8080,() => {
    console.log("O servidor está ativo na porta 8080");
});

let Task = [];

// CREATE
app.post('/tasks', (req, res) => {
    try {
        const { title,description,completed } = req.body;
        Task.push({title,description,completed});
        res.send(Task);
    } catch (error) {
        console.error(error);
        res.status(500).send(`<h1> Erro de servidor </h1>`);        
    }
});

// READ
app.get('/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const index = id - 1;
        res.send(Task[index]);
    }catch (error) {
        console.error(error);
        res.status(500).send(`<h1> Erro de servidor </h1>`);
    }   
});

app.get('/tasks', (req, res) => {
    try {
        console.log(Task);
        res.send(Task);
    }catch (error) {
        console.error(error);
        res.status(500).send(`<h1> Erro de servidor </h1>`);
    }
});

// UPDATE
app.put('/tasks/:id', (req,res) => {
    try {
        const { id } = req.params;
        const index = id - 1;
        const {title,description,completed} = req.body;
        Task[index] = {title,description,completed};
        res.send(`<h1>A tarefa foi atualizado com sucesso!!! </h1>`);
        console.log(Task);
    }catch (error) {
        console.error(error);
        res.status(500).send(`<h1> Erro de servidor </h1>`);
    }
});

// DELETE
app.delete('/tasks/:id', (req,res) => {
    try {
        const {id} = req.params;
        const index = id - 1;
        Task.splice(index, 1);
        res.send(Task);
    }catch (error) {
        console.error(error);
        res.status(500).send("Erro de servidor");
    }
});

app.use(function (req, res) {
    res.status(404).send(`<h1> Rota não encontrada </h1>`)
})

// {
//     "title":"teste",
//     "description": "teste",
//     "completed": "teste"
//   }