import { Router } from "express";
import { createOwner, deleteOwner, getOneOwner, getOwner, updateOwner } from "../controllers/owner.controllers";
import { validateOwner } from "../validators/owner.validation";

const router = Router()
router.post("/owner", validateOwner, createOwner);
router.get("/owner", getOwner);
router.get("/owner/:id", getOneOwner);
router.put("/owner/:id", updateOwner);
router.delete("/owner/:id", deleteOwner);


export default router;