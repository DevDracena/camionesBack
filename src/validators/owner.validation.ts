import { celebrate, Joi, Segments } from 'celebrate';

export const ownerSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  direccion: Joi.string().required(),
 
});

export const validateOwner = celebrate({
  [Segments.BODY]: ownerSchema,
});