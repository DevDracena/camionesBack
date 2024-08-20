import { celebrate, Joi, Segments } from 'celebrate';

export const brandSchema = Joi.object({
  descripcion: Joi.string().required(),
});

export const validateBrand = celebrate({
  [Segments.BODY]: brandSchema,
});