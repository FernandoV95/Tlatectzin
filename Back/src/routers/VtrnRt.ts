import { Router } from "express";
import { veterinaryControllers } from "../controllers/VeterinaryCntll";
import { body } from "express-validator";
import { InputErrors } from "../middleware/inputErrors";

const VtrnRt = Router()

//server.use('/api/veterinary',routerVet)


VtrnRt.post('/',
    body('nombres')
        .notEmpty().withMessage('¡El nombre es obligatorio!'),
    body('apPat')
        .notEmpty().withMessage('¡El apellido paterno es obligatorio!'),
    body('tel')
        .notEmpty().withMessage('¡EL telefono es obligatorio!'),
    body('email')
        .notEmpty().withMessage('¡El Correo es obligatorio!')
        .isEmail().withMessage('E-mail no válido'),
    body('cedula')
    .notEmpty().withMessage('¡La cedula es obligatoria!'),
    InputErrors,
    veterinaryControllers.createVeterinary
)

VtrnRt.delete('/:idV',
    InputErrors,
    veterinaryControllers.deleteVeterinary
)


export default VtrnRt