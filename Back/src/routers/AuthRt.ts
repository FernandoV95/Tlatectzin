import { Router } from "express"; 
import { body } from "express-validator";
import { InputErrors } from "../middleware/inputErrors"; 
import { AuthController } from "../controllers/AuthCntll";


const AuthRt = Router()


//Logear cualquier cuenta
AuthRt.post('/login',
    AuthController.login
)

//Validar la cuenta mediante Codigo 
AuthRt.post('/valAcct',
    InputErrors,
    AuthController.validateAccountCod
)

//Solicitar CODIGO por mensaje para cambiar la contraseña
AuthRt.post('/sendCod',
    InputErrors,
    AuthController.SendCodChngPass
)

//Validar el cODIGO para cambiar contraseña
AuthRt.post('/valCodUpdtPss',
    InputErrors,
    AuthController.validateCodChngPass
)

//Solicitar un nuevo codigo
AuthRt.post('/reqCod',
    InputErrors,
    AuthController.requestCod
)

export default AuthRt 