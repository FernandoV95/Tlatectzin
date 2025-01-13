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


//-----------> Citas <------------

//Ver todas las citas
AdmindRt.get('/show/mtngs',
    InputErrors,
    Admind.getAllMeeting
)

//Ver cita por ID
AdmindRt.get('/show/mtngs/:idM',
    InputErrors,
    Admind.getByMttng
)

//Ver a todos los veterinarios
AdmindRt.get('/AllVeter',
    InputErrors,
    Admind.getAllVet
)


//Buscamos citas con fecha y hora similares pero con veterinarios disponibles
AdmindRt.get('/show/mtng/:idM/veter-available/',
    InputErrors,
    Admind.vetersAvailable
)

//Asignamos el veterinario
AdmindRt.patch('/show/mtng/:idM/assign-veter/',
    InputErrors,
    Admind.assignVeter
)



//-----------> Mascotas <------------

//Rutas para crear nueva mascotas <-Adminds
AdmindRt.post('/pet/new',
    InputErrors,
    petsControllers.createPet
)
//Agrega imagenes a la amscota
AdmindRt.post('/pet/add-img/:idPet',
    InputErrors,
    validatePet,
    saveImg,
    petsImgControllers.addImgPet
)



//Actualizar datos <- Adminds
AdmindRt.put('/pet/data/updt/:idPet',
    InputErrors,
    petsControllers.updatePet
)

//Borra imagenes de la mascota
AdmindRt.delete('/pet/:idPet/imgs/delete/:idIP',
    InputErrors,
    validatePet,
    petsImgControllers.deleteImgPetById
)



//Rutas para las imagenes de las mascotas <- admind




//Borrar todas las imagenes
AdmindRt.delete('/pet/:idPet/imgs/',
    InputErrors,
    validatePet,
    petsImgControllers.deleteAllImg
)


export default AdmindRt