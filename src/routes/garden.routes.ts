import { Router } from "express";
import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { validateGarden } from "../validators/garnden.validation";

const router = Router()
router.post("/garden", validateGarden, createGarden);
router.get("/garden", getGarden);
router.get("/garden/viewActivity", getActivity);
router.get("/garden/:id", getOneGarden);
router.put("/garden/:id", updateGarden);
router.delete("/garden/:id", deleteGarden);


export default router;