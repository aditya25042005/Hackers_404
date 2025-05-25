import Router from "express";
import {createUser,loginuser,verifyotp} from "../controller/user.js";
const router = Router();
router.post("/createuser/otp",verifyotp);

router.post("/createuser",createUser);
router.post("/check",loginuser);

export default router;