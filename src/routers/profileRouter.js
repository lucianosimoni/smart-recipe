import express from "express";
import {
  profileCreate,
  profileGet,
  profileUpdate,
  profileDelete,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/", profileCreate);
router.get("/", profileGet);
router.put("/:userId", profileUpdate);
router.delete("/:userId", profileDelete);

export default router;
