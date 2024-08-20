import { celebrate, Joi, Segments } from 'celebrate';

export const hangarSchema = Joi.object({
  id_state: Joi.number().required(),
  descripcion: Joi.string().required(),

});

export const hangarValidate = celebrate({
  [Segments.BODY]: hangarSchema,
});