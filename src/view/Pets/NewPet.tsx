import { useState } from "react";
import styles from "../../modules/NewPet.module.css";
import NewDataPet from "../../components/Pets/NewDataPet";
import NewImgPet from "../../components/Pets/NewImgsPet";
import { idForm } from "../../schema/Meetings";

function NewPet() {
    const [idPet, setIdPet] = useState<idForm['_id']>('')
    const [isValidIdPet, setIsValidIdPet] = useState(false)



    return (
        <>
            <div className={styles.cajita}>
                <h2 className="w-full text-center text-white font-fascinate">Nueva Mascota</h2>
                {
                    !isValidIdPet ?
                        <NewDataPet  setIdPet={setIdPet} setIsValidIdPet={setIsValidIdPet}  /> 
                        : <NewImgPet idPet={idPet} />
                }
            </div>

        </>
    )
}

export default NewPet