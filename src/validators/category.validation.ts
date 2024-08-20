import { celebrate, Joi, Segments } from 'celebrate';

export const categorySchema = Joi.object({
  descripcion: Joi.string().required(),
});

export const validateCategory = celebrate({
  [Segments.BODY]: categorySchema,
});