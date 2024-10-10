import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";

const UserRt = Router()

//-----------------Rutas para Inicio de sesion de los usuarios-----------------

//Crear cuenta
UserRt.post('/',
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



export default UserRt