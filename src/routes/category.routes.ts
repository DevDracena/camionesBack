import { Router } from "express";
import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { validateGarden } from "../validators/garnden.validation";
import { createCategory, getCategory } from "../controllers/category.controllers";
import { validateCategory } from "../validators/category.validation";

const router = Router()
router.post("/category", validateCategory, createCategory);
router.get("/category", getCategory);
router.get("/garden/viewActivity", getActivity);
router.get("/garden/:id", getOneGarden);
router.put("/garden/:id", updateGarden);
router.delete("/garden/:id", deleteGarden);


export default router;