import { celebrate, Joi, Segments } from 'celebrate';

export const truckSchema = Joi.object({
  id_hangar: Joi.number(),
  id_state: Joi.number().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  chapa: Joi.string().required(),
});

export const truckValidate = celebrate({
  [Segments.BODY]: truckSchema,
});