import { Router } from "express"; 
import { InputErrors } from "../middleware/inputErrors";
import { Admind } from "../controllers/AdmindCntlls";


const AdmindRt = Router()

//Ver todos los usuarios registrados
AdmindRt.get('/AllUsers',
    InputErrors,
    Admind.getUsers
)

//Ver al usuario por Id
AdmindRt.get('/user/:id',
    InputErrors,
    Admind.getUsersId
)

//Mandar correo para que los veterinarios se registren
AdmindRt.post('/sendEmailVeter',
    InputErrors,
    Admind.sendEmailVeter
)

//Cambiar-Actualizar Datos de cualquier usuario
AdmindRt.put('/ChngData/:id',
    InputErrors,
    Admind.ChngData
)

export default AdmindRt