import { Router } from "express";
import { create, getOne } from "../modules/profiles/profileController";

const router = Router();

router.post("/create", create);
router.get("/getOneByUser/:id", getOne);

export default router;
