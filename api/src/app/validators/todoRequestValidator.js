const Joi = require("joi");

// Define a schema for creating a new todo
const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  completed: Joi.bool(),
});

// Define a schema for updating an existing todo
const updateTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  completed: Joi.bool(),
});

module.exports = {
  createTodoSchema: (data) => {
    // Use the abortEarly option to collect all errors
    return createTodoSchema.validate(data, { abortEarly: false });
  },
  updateTodoSchema: (data) => {
    return updateTodoSchema.validate(data, { abortEarly: false });
  },
};
