import { Router } from "express";
import { Accounts } from "../controllers/UsersCntlls";
import { body } from "express-validator";
import { InputErrors } from "../middleware/inputErrors";


const AuthRt = Router()

//Crear un nuevo usuario
AuthRt.post('/',
    InputErrors,
    Accounts.newUser
)

//Logear cualquier cuenta
AuthRt.post('/login',
    Accounts.login
)

//Validar la cuenta mediante Codigo de cualquier cuenta
AuthRt.post('/valAcct',
    InputErrors,
    Accounts.validateAccountToken
)

//Solicitar CODIGO para cambiar la contraseña
AuthRt.post('/forgotPass',
    InputErrors,
    Accounts.forgotPass
)

//Validar el cODIGO para cambiar contraseña
AuthRt.post('/valCod',
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
    Accounts.updatePass
)

//Solicitar un nuevo codigo
AuthRt.post('/reqCod',
    InputErrors,
    Accounts.requestToken
)

export default AuthRt 