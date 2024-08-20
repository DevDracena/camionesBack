import { Router } from "express";
import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { validateGarden } from "../validators/garnden.validation";
import { createCategory, getCategory } from "../controllers/category.controllers";
import { validateBrand } from "../validators/brand.validation";
import { createBrand, getBrand } from "../controllers/brand.controllers";
import { createSupplier, getSupplier } from "../controllers/supplier.controllers";
import { validateProduct } from "../validators/product.validation";
import { createProduct, getProduct, getProductView } from "../controllers/product.controllers";

const router = Router()
router.post("/product", validateProduct, createProduct);
router.get("/product", getProduct);
router.get("/product/viewProduct", getProductView);
router.get("/garden/:id", getOneGarden);
router.put("/garden/:id", updateGarden);
router.delete("/garden/:id", deleteGarden);


export default router;