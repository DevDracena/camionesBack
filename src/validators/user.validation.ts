import { celebrate, Joi, Segments } from 'celebrate';

export const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  id_level: Joi.number().required(),
  username: Joi.string().required(),
  cargo: Joi.string().required(),

});

export const userValidate = celebrate({
  [Segments.BODY]: userSchema,
});