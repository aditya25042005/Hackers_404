import Router from "express";
import {createUser,loginuser,verifyotp,give_email,logout } from "../controller/user.js";
const router = Router();
router.post("/createuser/otp",verifyotp);

router.post("/createuser",createUser);
router.post("/check",loginuser);
router.get("/give_email",give_email);
router.get("/logout",logout);

export default router;