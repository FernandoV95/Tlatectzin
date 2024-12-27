import { Router } from "express";
import { petsControllers } from "../controllers/PetsController";
import { InputErrors } from "../middleware/inputErrors";
import saveImg from "../middleware/saveImg";
import { petsImgControllers } from "../controllers/PetsImgCntlls";
import validatePet from "../middleware/validatePet";

const PetsRt = Router()

//Ver a las mascotas
PetsRt.get('/show',
    InputErrors,
    petsControllers.getAllPets
)

//Ver a la mascota por ID
PetsRt.get('/show/:idPet',
    InputErrors,
    petsControllers.getPetsById
)


export default PetsRt 