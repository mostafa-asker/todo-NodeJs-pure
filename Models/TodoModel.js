const fs = require('fs');
const path = `${__dirname}/../database/data.json`;

class TodoModel 
{
    async readFilePro() 
    {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) reject("We don't found this file!");
                resolve(data);
            });
        });
    }

    async writeFile(data) 
    {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(data, null, 2), err => {
                if (err) reject("We can't write in this file!");
                resolve('File has been written!');
            });
        });
    }

    async getAllTodos() 
    {
        const data = await this.readFilePro();        
        return JSON.parse(data); 
    }

    async create(todoDTO) 
    {
        let data = await this.getAllTodos();
        
        data.push({
            id: data.length +1,
            title: todoDTO.title,
            description: todoDTO.description,
            duration: todoDTO.duration,
            date: todoDTO.date
        });

        await this.writeFile(data);
        return todoDTO; 

    }

    async create(todoDTO) {
        const todos = await this.getAllTodos();
        const newTodo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1, // Generate a unique ID
            title: todoDTO.title,
            description: todoDTO.description,
            duration: todoDTO.duration,
            date: todoDTO.date,
        };
        todos.push(newTodo);
        await this.writeFile(todos);
        return newTodo;
    }

    async update(todoData, id) {
        console.log(id);
        
        const todos = await this.getAllTodos();
        const index = todos.findIndex((todo) => todo.id == id);

        if (index === -1) {
            throw new Error(`Todo with ID ${id} not found.`);
        }

        todos[index] = {
            id: index +1,
            title: todoData.title,
            description: todoData.description,
            duration: todoData.duration,
            date: todoData.date, 
        };

        await this.writeFile(todos);
        return todos[index];
    }

    async delete(id) 
    {
        let data = await this.getAllTodos();
        const index = data.findIndex(todo => todo.id === id);

        if (index === -1) {
            throw new Error(`Todo with id ${id} not found!`);
        }

        data.splice(index, 1);

        await this.writeFile(data);
        return `Todo with id ${id} has been deleted.` ;
    }
}

module.exports = TodoModel;
