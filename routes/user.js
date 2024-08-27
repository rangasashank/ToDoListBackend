import express from "express";

import {getAllUsers,
        getMyProfile,
        login, 
        register,
        logout,
    } from "../controllers/user.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/logout", logout);
router.post("/new", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
