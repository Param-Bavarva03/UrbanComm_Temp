const zod = require('zod');

function validateInput(data, schema) {
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
        throw new Error(validatedData.error.errors[0].message);
    }
}

module.exports = validateInput;
