import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";

const routerUser = Router()

//-----------------Rutas para Inicio de sesion de los usuarios-----------------

//Crear cuenta
routerUser.post('/new-user',
    body('nombres')
        .notEmpty().withMessage('¡Tu nombre es obligatorio!'),
    body('apPat')
        .notEmpty().withMessage('¡Tu apellido paterno es obligatorio!'),
    body('tel')
        .notEmpty().withMessage('¡Tu telefono es obligatorio!'),
    body('email')
        .notEmpty().withMessage('¡Tu Correo es obligatorio!')
        .isEmail().withMessage('E-mail no válido'),
    body('pass')
        .notEmpty().withMessage('¡Tu contraseña es obligatoria!'),
    body('pass_confirm').custom((value, { req }) => {
        if (value !== req.body.pass) {
            throw new Error('¡Tu contraseña no coincide!')
        }
        return true
    }),
    InputErrors,
    UserController.newUser
)

//Autentica cuenta
routerUser.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('¡Token no valido!'),
    InputErrors,
    UserController.validateAccountToken
)

//Olvide mi contraseña
routerUser.post('/forgot-pass',
    body('email')
        .notEmpty().withMessage('¡Tu Correo es obligatorio!')
        .isEmail().withMessage('E-mail no válido'),
    InputErrors,
    UserController.forgotPass
)

//Token de validacion
routerUser.post('/valid-reset-token',
    body('token')
        .notEmpty().withMessage('¡Token no valido!'),
    InputErrors,
    UserController.validateResetToken
)

//Reestablecer contraseña
routerUser.post('/reset-pass/:token',
    body('pass')
        .notEmpty().withMessage('¡Tu contraseña es obligatoria!'),
    body('pass_confirm').custom((value, { req }) => {
        if (value !== req.body.pass) {
            throw new Error('¡Tu contraseña no coincide!')
        }
        return true
    }),
    InputErrors,
    UserController.resetPass
)

//Iniciar sesion
routerUser.post('/login',
    body('email')
        .notEmpty().withMessage('¡Tu Correo es obligatorio!')
        .isEmail().withMessage('E-mail no válido'),
    body('pass')
        .notEmpty().withMessage('¡Tu contraseña es obligatoria!'),
    InputErrors,
    UserController.login
)

//Solicitar un nuevo token
routerUser.post('/request-token',
    body('email')
        .notEmpty().withMessage('¡Tu Correo es obligatorio!')
        .isEmail().withMessage('E-mail no válido'),
    InputErrors,
    UserController.requestToken
)


//-----------------Rutas para Agendar Cita -----------------


export default routerUser