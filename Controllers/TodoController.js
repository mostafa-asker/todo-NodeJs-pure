const TodoModel =  require(`${__dirname}/../Models/TodoModel.js`);
const TodoValidator = require(`${__dirname}/../Validators/TodoValidator.js`);
const todoModel = new TodoModel();
const todoValidator = new TodoValidator();
class TodoController 
{
    async list()
    {        
        return {
            status: 200,
            success: true,
            data: await todoModel.getAllTodos()
        }        
    }   

    async create(data) 
    {
        const validationErrors = await todoValidator.validateCreate(data);
        if (validationErrors.length > 0) {
            return {
                status: 422,
                success: false,
                errors: validationErrors,
            };
        }
        
        try {
            await todoModel.create(data);
            return {
                status: 201,
                success: true,
                message: "Todo created successfully!",
            };
        } catch (err) {
            return {
                status: 500,
                success: false,
                error: err.message,
            };
        }

    }

    async update(data, id)
    { 
        const validationErrors = await todoValidator.validateUpdate(data);
        if (validationErrors.length > 0) {
            return {
                status: 422,
                success: false,
                errors: validationErrors,
            };
        }

        return {
            status: 200,
            success: true,
            data: await todoModel.update(data, id)
        }
    }

    async delete(id)
    {
        return {
            status: 200,
            success: true,
            data: await todoModel.delete(id)
        }
    }
}

module.exports = TodoController;