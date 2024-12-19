import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterUserForm, UserForm } from "../../schema/Users"; // Asegúrate de que UserForm esté actualizado
import Errors from "../../components/Errors";
import styles from "../../modules/newUser.module.css";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { BsMailboxFlag } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";

type UserFormProps = {
    register: UseFormRegister<RegisterUserForm>,  
    errors: FieldErrors<UserForm>
};

function FormUser({ register, errors }: UserFormProps) {
    return (
        <>
            {/* Fila de Nombre y Teléfono */}
            <div className="grid grid-cols-2 w-full gap-4 mb-3">
                <div className={`${styles.inputBox} relative`}>
                    <input
                        type="text"
                        placeholder="Nombre(s)"
                        {...register('nombres', { required: true })}
                        className="w-full"
                    />
                    <FaUserTie className={`${styles.icon} absolute right-4`} />
                    {errors.nombres?.type === 'required' && <Errors>{'¡Tu nombre es obligatorio!'}</Errors>}
                </div>
                <div className={`${styles.inputBox} relative`}>
                    <input
                        type="text"
                        placeholder="Teléfono"
                        {...register('tel', { required: true })}
                        className="w-full"
                    />
                    <GiSmartphone className={`${styles.icon} absolute right-4`} />
                    {errors.tel?.type === 'required' && <Errors>{'¡Tu teléfono es obligatorio!'}</Errors>}
                </div>
            </div>

            {/* Fila de Apellidos */}
            <div className="grid grid-cols-2 w-full gap-4 mb-4">
                <div className={`${styles.inputBox} relative`}>
                    <input
                        type="text"
                        placeholder="Apellido Paterno"
                        {...register('apPat', { required: true })}
                        className="w-full"
                    />
                    <MdDriveFileRenameOutline className={`${styles.icon} absolute right-4`} />
                    {errors.apPat?.type === 'required' && <Errors>{'¡Tu apellido es obligatorio!'}</Errors>}
                </div>
                <div className={`${styles.inputBox} relative`}>
                    <input
                        type="text"
                        placeholder="Apellido Materno"
                        className="w-full"
                        {...register('apMat', { required: false })}
                    />
                    <MdDriveFileRenameOutline className={`${styles.icon} absolute right-4`} />
                </div>
            </div>

            {/* Campo de Correo */}
            <div className="w-full mb-4">
                <div className={`${styles.inputBox} relative`}>
                    <input
                        type="email"
                        placeholder="Correo"
                        {...register("email", {
                            required: "¡Tu Correo es obligatorio!",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                        className="w-full"
                    />
                    <BsMailboxFlag className={`${styles.icon} absolute right-4`} />
                    {errors.email && (<Errors>{errors.email?.message}</Errors>)}
                </div>
            </div>
        </>
    );
}

export default FormUser;
