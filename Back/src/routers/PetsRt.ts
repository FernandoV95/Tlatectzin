import { Router } from "express";
import { petsControllers } from "../controllers/PetsController";
import { InputErrors } from "../middleware/inputErrors";
import saveImg from "../middleware/saveImg";
import { petsImgControllers } from "../controllers/PetsImgCntlls";
import validatePet from "../middleware/validatePet";

const PetsRt = Router()

//Rutas para las mascotas
PetsRt.post('/',
    InputErrors,
    petsControllers.createPet
)

PetsRt.get('/',
    InputErrors,
    petsControllers.getAllPets
)

PetsRt.get('/:idPet',
    InputErrors,
    petsControllers.getPetsById
)

PetsRt .put('/:idPet',
    InputErrors,
    petsControllers.updatePet
)

PetsRt.delete('/:idPet',
    InputErrors,
    validatePet,
    petsControllers.deletePet
)



//Rutas para las imagenes de las mascotas
PetsRt.post('/:idPet/imgs/',
    saveImg,
    InputErrors,
    validatePet, 
    petsImgControllers.createImg
)

PetsRt.delete('/:idPet/imgs/:idIP',
    InputErrors,
    validatePet, 
    petsImgControllers.deleteImgPetById
)

PetsRt.delete('/:idPet/imgs/',
    InputErrors,
    validatePet, 
    petsImgControllers.deleteAllImg
)

export default PetsRt 