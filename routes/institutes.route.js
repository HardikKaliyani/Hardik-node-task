import express from "express";
import instituteController from "../controllers/institute.controller.js";
const router = express.Router();

router.route("/register").post(instituteController.registerInstitute);
router.route("/:id").get(instituteController.fetchInsituteDetails);

export default router;
