const Joi = require("joi");

// Define a schema for creating a new task
const createTaskSchema = Joi.object({
  todoId: Joi.number().required(),
  title: Joi.string().required(),
  completed: Joi.bool(),
});

// Define a schema for updating an existing task
const updateTaskSchema = Joi.object({
  todoId: Joi.number(),
  title: Joi.string(),
  completed: Joi.bool(),
});

module.exports = {
  createTaskSchema: (data) => {
    // Use the abortEarly option to collect all errors
    return createTaskSchema.validate(data, { abortEarly: false });
  },
  updateTaskSchema: (data) => {
    return updateTaskSchema.validate(data, { abortEarly: false });
  },
};
