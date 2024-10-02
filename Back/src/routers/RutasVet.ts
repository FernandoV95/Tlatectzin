import { Router } from "express";
import { veterinaryControllers } from "../controllers/VeterinaryCntll";

const routerVet = Router()

routerVet.post('/',
    veterinaryControllers.createVeterinary
)




export default routerVet