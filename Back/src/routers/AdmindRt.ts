import { Router } from "express"; 
import { body } from "express-validator";
import { InputErrors } from "../middleware/inputErrors";
import { Admind } from "../controllers/AdmindCntlls";


const AdmindRt = Router()

//Ver todos los usuarios registrados
AdmindRt.get('/',
    InputErrors,
    Admind.getUsers
)

export default AdmindRt