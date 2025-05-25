import { Router } from "express";

import {temp_create_history, loadhistory,sendhistory} from "../controller/history.js";



const router = Router();
router.post("/temp_create", temp_create_history);
router.post("/loadhistory", loadhistory);
router.post("/sendhistory", sendhistory);

export default router;