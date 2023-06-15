import express from "express";
import { userGet, userDelete } from "../controllers/userController.js";

const router = express.Router();

router.get("/", userGet);
router.delete("/:userId", userDelete);
// TODO: Add the Update Endpoint

export default router;
