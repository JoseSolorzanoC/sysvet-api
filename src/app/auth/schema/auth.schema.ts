import * as Joi from 'joi';

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
});

const signUpSchema = Joi.object().keys({
    documentType: Joi.number().required(),
    documentNumber: Joi.string().regex(/[0-9]/).required(),
    fullName: Joi.string()
        .regex(/^[a-z ,.'-]+$/i)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum(),
    passwordHash: Joi.string(),
    phoneNumber: Joi.string().regex(/[0-9]/).required(),
});

export { loginSchema, signUpSchema };
