import { Router } from "express";
import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { validateGarden } from "../validators/garnden.validation";
import { createCategory, getCategory } from "../controllers/category.controllers";
import { validateBrand } from "../validators/brand.validation";
import { createBrand, getBrand } from "../controllers/brand.controllers";
import { createSupplier, getSupplier } from "../controllers/supplier.controllers";
import { validateSupplier } from "../validators/supplier.validation";

const router = Router()
router.post("/supplier", validateSupplier, createSupplier);
router.get("/supplier", getSupplier);
router.get("/garden/viewActivity", getActivity);
router.get("/garden/:id", getOneGarden);
router.put("/garden/:id", updateGarden);
router.delete("/garden/:id", deleteGarden);


export default router;