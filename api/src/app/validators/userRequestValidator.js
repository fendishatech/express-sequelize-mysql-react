const Joi = require("joi");

// Define a schema for creating a new user
const createUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone_no: Joi.string().required(),
});

// Define a schema for updating an existing user
const updateUserSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  phone_no: Joi.string(),
});

module.exports = {
  createUserSchema: (data) => {
    // Use the abortEarly option to collect all errors
    return createUserSchema.validate(data, { abortEarly: false });
  },
  updateUserSchema: (data) => {
    return updateUserSchema.validate(data, { abortEarly: false });
  },
};
