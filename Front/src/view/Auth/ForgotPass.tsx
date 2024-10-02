import { useForm } from "react-hook-form";
import { EmailForm } from "../../schema/RegisterUser";
import Errors from "../../components/Errors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPass } from "../../Api/UserApi";
import { useNavigate } from "react-router-dom";



function ForgotPass() {
    const goMenu = useNavigate()
    const datos: EmailForm = {
        email: ""
    };

    const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>({
        defaultValues: datos
    });

    const { mutate } = useMutation({
        mutationFn: forgotPass,  //Esta es la función que se va a ejecutar cuando llamamos al mutation
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data) //El data es del Backend y en front está en Servicios
            goMenu('/')
        }
    })

    const onSub = (data: EmailForm) => {
        mutate(data);
    }

    return (
        <>
            <h1>Ingresa tu correo</h1>
            <form onSubmit={handleSubmit(onSub)} noValidate >

                <div>
                    <label>Correo</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <Errors>{errors.email.message}</Errors>
                    )}
                </div>


                <input type="submit" value="Enviar" />

            </form>
        </>
    )
}

export default ForgotPass