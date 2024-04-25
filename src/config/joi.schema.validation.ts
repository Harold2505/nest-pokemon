import * as Joi from 'joi';
//crear un validation schema
//que tenga las propiedades de estoy esperando
export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3002),
  DEFAULT_LIMIT: Joi.number().default(10),
});
