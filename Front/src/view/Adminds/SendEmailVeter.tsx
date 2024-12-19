
import { FaEnvelope } from 'react-icons/fa'
import Errors from '../../components/Errors'
import { EmailForm } from '../../schema/Users';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { sendEmail } from '../../Api/AdmindApi';
import { toast } from 'react-toastify';

export default function SendEmailVeter() {

  const goMenu = useNavigate()

  const datos: EmailForm = {
    email: ""
  };

  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>({
    defaultValues: datos
  });

  const { mutate } = useMutation({
    mutationFn: sendEmail,  
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data) 
      goMenu('/')
    }
  })

  const onSub = (data: EmailForm) => {
    mutate(data)
  }

  return (
    <>
      <div className={` h-lvh`}>
        <div className="pt-36 w-4/5 m-auto">
          <h1 className="  font-fascinate text-center text-white ">Enviar el formulario</h1>
          <div className=" w-1/2 mt-20">
            <form onSubmit={handleSubmit(onSub)} noValidate className="" >
              <div className=" flex flex-col mt-3">
                <div className="relative">
                  <input id="email" type="email" placeholder="Email" className="input-field "
                    {...register("email", {
                      required: "¡Tu Correo es obligatorio!",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                      },
                    })} />
                  <FaEnvelope className="absolute left-4 top-5 text-white" />
                  {errors.email?.type === 'required' && <Errors>{'¡Tu correo es obligatorio!'}</Errors>}
                </div>
              </div>
              <div className=" flex justify-center ">
                <input type="submit" value="Enviar" className={` w-1/2 mt-3 text-black font-bold text-xl `} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
