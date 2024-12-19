import { Router } from "express";
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";
import { UserController } from "../controllers/UsersCntlls";

const UserRt = Router()

//-----------------Rutas para Inicio de sesion de los usuarios-----------------

//Crear un nuevo usuario
UserRt.post('/new',
    InputErrors,
    UserController.newUser
)

//Crear un nuevo veterinario
UserRt.post('/newVeter',
    InputErrors,
    UserController.newVeter
)

//Cambiar la contraseña
UserRt.patch('/updtPss/:token',
    body('pass').notEmpty().withMessage('¡Tu contraseña es obligatoria!'),
    body('pass_confirm').custom((value, { req }) => {
        if (value !== req.body.pass) {
            throw new Error('¡Tu contraseña no coincide!')
        }
        return true
    }),
    InputErrors,
    UserController.updatePass
)



export default UserRt