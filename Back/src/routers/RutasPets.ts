import { Router } from "express";
import { petsControllers } from "../controllers/PetsController";
import { InputErrors } from "../middleware/inputErrors";
import saveImg from "../middleware/saveImg";
import { petsImgControllers } from "../controllers/PetsImgCntlls";
import validatePet from "../middleware/validatePet";

const routerPets = Router()

//Rutas para las mascotas
routerPets.post('/',
    InputErrors,
    petsControllers.createPet
)

routerPets.get('/',
    InputErrors,
    petsControllers.getAllPets
)

routerPets.get('/:idPet',
    InputErrors,
    petsControllers.getPetsById
)

routerPets.put('/:idPet',
    InputErrors,
    petsControllers.updatePet
)

routerPets.delete('/:idPet',
    InputErrors,
    validatePet,
    petsControllers.deletePet
)



//Rutas para las imagenes de las mascotas
routerPets.post('/:idPet/imgs/',
    saveImg,
    InputErrors,
    validatePet, 
    petsImgControllers.createImg
)

routerPets.delete('/:idPet/imgs/:idIP',
    InputErrors,
    validatePet, 
    petsImgControllers.deleteImgPetById
)

routerPets.delete('/:idPet/imgs/',
    InputErrors,
    validatePet, 
    petsImgControllers.deleteAllImg
)

export default routerPets