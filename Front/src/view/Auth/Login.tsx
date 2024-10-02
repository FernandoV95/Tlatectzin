import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../schema/RegisterUser";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../Api/UserApi";
import { toast } from "react-toastify";
import Errors from "../../components/Errors";


export default function Login() {
    const goMenu = useNavigate();

    const initialValues: LoginForm = {
        email: '',
        pass: '',
    };

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            goMenu('/')
        }
    })



    const onSub = (formData: LoginForm) => {
        mutate(formData)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSub)} noValidate >


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



                <input type="submit" value="Enviar" />

            </form>
        </>
    )
}
