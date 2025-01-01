import { Router } from "express";
import { petsControllers } from "../controllers/PetsController";
import { InputErrors } from "../middleware/inputErrors";
import validatePet from "../middleware/validatePet";
import { petsImgControllers } from "../controllers/PetsImgCntlls";


const PetsRt = Router()

//Ver [datos/imagenes] todas las mascotas
PetsRt.get('/show',
    InputErrors,
    petsControllers.getAllPets
)

//Ver [datos/imagenes] de la mascota por ID
PetsRt.get('/show/:idPet',
    InputErrors,
    petsControllers.getPetsById
)

//Traer todas las imagenes de la mascota correspondiente
PetsRt.get('/show/imgs/:idPet',
    InputErrors,
    validatePet,
    petsImgControllers.getAllImgByPetID
)

//Trae solo las mascotas disponibles
PetsRt.get('/catalog',
    InputErrors, 
    petsControllers.catalogo
)



export default PetsRt 