class TodoValidator {
    async validateCreate(data) {
        const errors = [];
        
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string.');
        }
        if (!data.description || typeof data.description !== 'string') {
            errors.push('Description is required and must be a string.');
        }
        if (!data.duration || typeof data.duration !== 'string') {
            errors.push('Duration is required and must be a string.');
        }
        if (!data.date || isNaN(Date.parse(data.date))) {
            errors.push('Date is required and must be a valid date.');
        }

        return errors;
    }

    async validateUpdate(data) {
        const errors = [];

        if (data.title && typeof data.title !== 'string') {
            errors.push('Title must be a string.');
        }
        if (data.description && typeof data.description !== 'string') {
            errors.push('Description must be a string.');
        }
        if (data.duration && typeof data.duration !== 'string') {
            errors.push('Duration must be a string.');
        }
        if (data.date && isNaN(Date.parse(data.date))) {
            errors.push('Date must be a valid date.');
        }

        return errors;
    }
}

module.exports = TodoValidator;
