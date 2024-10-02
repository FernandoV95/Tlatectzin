import { useNavigate } from "react-router-dom";
import { EmailForm } from "../../schema/RegisterUser";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestToken } from "../../Api/UserApi";
import { toast } from "react-toastify";
import Errors from "../../components/Errors";

function RequestToken() {

    const goToken = useNavigate()
    const datos: EmailForm = {
        email: ""
    };

    const { register,reset, handleSubmit, formState: { errors } } = useForm<EmailForm>({
        defaultValues: datos
    });

    const { mutate } = useMutation({
        mutationFn: requestToken,  //Esta es la función que se va a ejecutar cuando llamamos al mutation
        onError: (error) => {
            toast.error(error.message)
            reset()
        },
        onSuccess: (data) => {
            toast.success(data) //El data es del Backend y en front está en Servicios
            goToken('/auth/confirm-account')
        }
    })



    const onSub = (data: EmailForm) => {
        mutate(data);
    }
    return (
        <>
            <h1>Solicita otro Token</h1>
            <form onSubmit={handleSubmit(onSub)} noValidate >

                <div>
                    <label>Correo</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "¡Tu Correo es obligatorio!",
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

export default RequestToken