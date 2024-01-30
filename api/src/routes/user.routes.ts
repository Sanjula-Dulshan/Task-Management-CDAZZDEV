import express from "express";
import {
  Login,
  Register,
  getAccessToken,
  logout,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);
router.post("/refresh_token", getAccessToken);

export default router;
