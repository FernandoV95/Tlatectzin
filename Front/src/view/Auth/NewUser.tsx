import { useForm } from "react-hook-form";
import { RegisterUserForm } from "../../schema/RegisterUser";
import Errors from "../../components/Errors";
import { useMutation } from "@tanstack/react-query";
import { newUser } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewUser() {
    const goToken = useNavigate();

    const initialValues: RegisterUserForm = {
        nombres: '',
        apPat: '',
        apMat: '',
        tel: undefined,
        email: '',
        pass: '',
        pass_confirm: '',
    };

    const { register,getValues, handleSubmit, formState: { errors } } = useForm<RegisterUserForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: newUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            goToken('/auth/confirm-account')
        }
    })



    const onSub = (formData: RegisterUserForm) => {
        mutate(formData)
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSub)} noValidate >

                <div className=" flex flex-col mt-3">
                    <label htmlFor="nombres"><span className="text-red-700">*</span> Nombre(s)</label>
                    <input id="nombres" type="text" placeholder="Ej: Andres Manuel " className=" form-control" {...register('nombres', { required: true })} />
                    {errors.nombres?.type === 'required' && <Errors>{'¡Tu Nombre es obligatorio!'}</Errors>}
                </div>

                <div className=" flex flex-col mt-3">
                    <label htmlFor="apPat"><span className="text-red-700">*</span> Apellido Paterno</label>
                    <input id="apPat" type="text" placeholder="Ej: Lopez" className=" form-control" {...register('apPat', { required: true })} />
                    {errors.apPat?.type === 'required' && <Errors>{'¡Tu apellido es obligatorio!'}</Errors>}
                </div>

                <div className=" flex flex-col mt-3">
                    <label htmlFor="apMat">Apellido Materno</label>
                    <input id="apMat" type="text" placeholder="Ej: Obrador" className=" form-control" {...register('apMat', { required: false })} />
                </div>

                <div className=" flex flex-col mt-3">
                    <label htmlFor="tel"><span className="text-red-700">*</span> Telefono</label>
                    <input id="tel" type="tel" placeholder="Ej: 5596374125" className=" form-control" {...register('tel', { required: true })} />
                    {errors.tel?.type === 'required' && <Errors>{'¡Tu telefono es obligatorio!'}</Errors>}
                </div>

                <div className=" flex flex-col mt-3">
                    <label htmlFor="email"><span className="text-red-700">*</span> E-mail</label>
                    <input id="email" type="email" placeholder="Ej: corre@dominio.com" className=" form-control" {...register('email', { required: true })} />
                    {errors.email?.type === 'required' && <Errors>{'¡Tu correo es obligatorio!'}</Errors>}
                </div>

                <div className=" flex flex-col mt-3">
                    <label htmlFor="pass"><span className="text-red-700">*</span> Contraseña</label>
                    <input id="pass" type='password' {...register('pass', { required: true })} />
                    {errors.pass?.type === 'required' && <Errors>{'¡La contraseña es obligatoria!'}</Errors>}
                </div>

                <div className=" flex flex-col mt-3">
                    <label htmlFor="pass_confirm"><span className="text-red-700">*</span> Confirmar contraseña</label>
                    <input id="pass_confirm" type="password" {...register("pass_confirm",
                        {
                            required: "¡Repite tu contraseña!",
                            validate: value => value ===  getValues('pass') || "¡Las contraseñas no coinciden!"
                        })} />
                    {errors.pass_confirm && <Errors>{errors.pass_confirm.message}</Errors>}
                </div>

                <input type="submit" value="Enviar" />

            </form>

        </>
    )
}

export default NewUser