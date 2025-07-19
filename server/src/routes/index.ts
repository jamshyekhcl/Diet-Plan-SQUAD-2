import { Router } from "express";
import userRoutes from "./usersRoute";
import profilesRoute from "./profilesRoute";
// import bmiLogRoute from "./bmiLogRoute";



const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/users", userRoutes);
router.use("/profiles", profilesRoute);
// router.use("/bmilog", bmiLogRoute);


export default router;
