import { useState } from "react";
import TAza from "../../components/animations/TAza";
import { FaLock } from "react-icons/fa";


export default function Auxiliar() {
    const [hiden, setHiden] = useState<boolean>(false);

    const Show = () => {
        setHiden(prevHiden => !prevHiden);
    };

    return (
        <>
            <div className="caja h-lvh">
                <div className="relative">
                    <input id="pass" type={hiden ? 'text' : 'password'} placeholder="contraseña" className="input-field" />
                    <FaLock className="absolute left-4 top-5  text-white" />
                    {hiden ?
                        <i className="bi bi-eye-slash-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show}></i>
                        :
                        <i className="bi bi-eye-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show}></i>
                    }


                </div>

                <TAza></TAza>
            </div>

        </>
    )
}
