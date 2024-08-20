import { celebrate, Joi, Segments } from 'celebrate';

export const supplierSchema = Joi.object({
  descripcion: Joi.string().required(),
  direccion: Joi.string().required(),
  contacto: Joi.string().required(),

});

export const validateSupplier = celebrate({
  [Segments.BODY]: supplierSchema,
});