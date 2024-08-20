import { celebrate, Joi, Segments } from 'celebrate';

export const gardenSchema = Joi.object({
  id_propietario: Joi.number().required(),
  fumigacion: Joi.string().required(),
  abono: Joi.string().required(),
  vestringias: Joi.string().required(),
  abono_universal: Joi.string().required(),
  entrada: Joi.number(),
  salida: Joi.number()
});

export const validateGarden = celebrate({
  [Segments.BODY]: gardenSchema,
});