import { Router } from "express";
// import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createHangar, getHangar } from "../controllers/hangar.controllers";
import { hangarValidate } from "../validators/hangar.validation";
import { createState, getState } from "../controllers/state.controllers";
import { stateValidate } from "../validators/state.validation";
import { createTruck, getListTruck, getTruck, updateTruck } from "../controllers/truck.controllers";
import { truckValidate } from "../validators/truck.validation";

const router = Router()
router.post("/truck", truckValidate, createTruck);
router.get("/truck", getTruck);
router.get("/truck/listTruckView", getListTruck);
// router.get("/user/:id", getOneUser);
router.put("/truck/:id", truckValidate, updateTruck);
// router.delete("/garden/:id", deleteGarden);


export default router;