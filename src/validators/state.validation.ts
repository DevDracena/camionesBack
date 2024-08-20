import { celebrate, Joi, Segments } from 'celebrate';

export const stateSchema = Joi.object({
  descripcion: Joi.string().required(),
});

export const stateValidate = celebrate({
  [Segments.BODY]: stateSchema,
});