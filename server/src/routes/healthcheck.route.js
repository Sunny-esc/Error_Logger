import { Router } from "express";
import { checkhealth } from "../controller/healthcheck.controller.js";
const router = Router();
router.route("/").get(checkhealth) ;


export default router;