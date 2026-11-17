import express from 'express'
import truckingController from "../controllers/trucking.controller.js"

const router = express.Router();

router.get("/", truckingController.showLogin);

router.get("/register", truckingController.showRegister);

router.post("/register", truckingController.createCompany);

router.post("/login", truckingController.login);

router.get("/dashboard", truckingController.showDashboard);

export default router;