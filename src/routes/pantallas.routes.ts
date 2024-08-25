import { Router } from "express";
// import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createHangar, getHangar } from "../controllers/hangar.controllers";
// import { hangarValidate } from "../validators/hangar.validation";
// import { createState, getState } from "../controllers/state.controllers";
// import { stateValidate } from "../validators/state.validation";
import { createTruck, getListTruck, getTruck, updateTruck } from "../controllers/truck.controllers";
// import { truckValidate } from "../validators/truck.validation";

const router = Router()

router.get("/truck/Hangar2View", getListTruck);
// router.get("/user/:id", getOneUser);



export default router;