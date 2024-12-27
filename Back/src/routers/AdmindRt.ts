import { Router } from "express"; 
import { InputErrors } from "../middleware/inputErrors";
import { Admind } from "../controllers/AdmindCntlls";
import validatePet from "../middleware/validatePet";
import { petsControllers } from "../controllers/PetsController";
import { petsImgControllers } from "../controllers/PetsImgCntlls";
import saveImg from "../middleware/saveImg";

/*   -> /admind   */

const AdmindRt = Router()

//-----------> Usuarios <------------
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
AdmindRt.put('/user/updt/:id',
    InputErrors,
    Admind.ChngData
)


//-----------> Mascotas <------------
//Rutas para las mascotas <-Adminds
AdmindRt.post('/pet/new',
    InputErrors,
    petsControllers.createPet
)


//Actualizar datos <- Adminds
AdmindRt.put('/pet/updt/:idPet',
    InputErrors,
    petsControllers.updatePet
)

//Cambiar status a adoptado <- Adminds
AdmindRt.delete('/pet/adopted/:idPet',
    InputErrors,
    validatePet,
    petsControllers.deletePet
)


//Rutas para las imagenes de las mascotas <- admind
//Agregar imagnes
AdmindRt.post('/pet/:idPet/imgs/',
    saveImg,
    InputErrors,
    validatePet, 
    petsImgControllers.createImg
)

//Borrar imagen por Id
AdmindRt.delete('/pet/:idPet/imgs/:idIP',
    InputErrors,
    validatePet, 
    petsImgControllers.deleteImgPetById
)

//Borrar todas las imagenes
AdmindRt.delete('/pet/:idPet/imgs/',
    InputErrors,
    validatePet, 
    petsImgControllers.deleteAllImg
)


export default AdmindRt