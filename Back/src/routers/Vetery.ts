import { Router } from "express";
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";
import { meetingControllers } from "../controllers/MettingController";
import { Authenticate } from "../middleware/Auth";


const VetRt = Router()

VetRt.use(Authenticate)

//Ver pacientes asignados de los veterinarios
VetRt.get('/meetings',
    InputErrors,
    meetingControllers.seePatients
)


export default VetRt