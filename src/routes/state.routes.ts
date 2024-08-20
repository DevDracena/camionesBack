import { Router } from "express";
import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createHangar, getHangar } from "../controllers/hangar.controllers";
import { hangarValidate } from "../validators/hangar.validation";
import { createState, getState } from "../controllers/state.controllers";
import { stateValidate } from "../validators/state.validation";

const router = Router()
router.post("/state", stateValidate, createState);
router.get("/state", getState);
router.get("/garden/viewActivity", getActivity);
router.get("/user/:id", getOneUser);
router.put("/garden/:id", updateGarden);
router.delete("/garden/:id", deleteGarden);


export default router;