import { Router } from "express";
import userRoutes from "./usersRoute";
import profilesRoute from "./profilesRoute";


const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/users", userRoutes);
router.use("/profiles", profilesRoute);


export default router;
