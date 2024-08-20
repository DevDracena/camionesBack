import { celebrate, Joi, Segments } from 'celebrate';

export const productSchema = Joi.object({
  id_marca: Joi.number().required(),
  id_proveedor: Joi.number().required(),
  id_categoria: Joi.number().required(),

  descripcion: Joi.string().required(),
  cantidad: Joi.number().required(),
  cantidad_anterior: Joi.number().required(),

});

export const validateProduct = celebrate({
  [Segments.BODY]: productSchema,
});