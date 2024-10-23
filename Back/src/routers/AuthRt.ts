import { Router } from "express";
import { Accounts } from "../controllers/AuthController";
import { body } from "express-validator";
import { InputErrors } from "../middleware/inputErrors";


const AuthRt = Router()
//Logear cualquier cuenta
AuthRt.post('/login',
    Accounts.login
)

//Validar el token de cualquier cuenta
AuthRt.post('/valAcct',
    InputErrors,
    Accounts.validateAccountToken
)

//Solicitar Token de cualquier cuenta para cambiar la contraseña
AuthRt.post('/forgotPass',
    InputErrors,
    Accounts.forgotPass
)

//Validar el token para cambiar contraseña
AuthRt.post('/valTokn',
    InputErrors,
    Accounts.validateResetToken
)

//Cambiar la contraseña
AuthRt.patch('/updtPss/:token',
    body('pass').notEmpty().withMessage('¡Tu contraseña es obligatoria!'),
    body('pass_confirm').custom((value, { req }) => {
        if (value !== req.body.pass) {
            throw new Error('¡Tu contraseña no coincide!')
        }
        return true
    }),
    InputErrors,
    Accounts.resetPass
)

//Solicitar un token
AuthRt.post('/ReqToken',
    InputErrors,
    Accounts.requestToken
)

export default AuthRt 