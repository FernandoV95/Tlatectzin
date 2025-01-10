
import { FaEnvelope } from 'react-icons/fa'
import Errors from '../../components/Errors'
import { EmailForm } from '../../schema/Users';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { sendEmail } from '../../Api/AdmindApi';
import { toast } from 'react-toastify';
import styles from "../../modules/login.module.css"


type UpdtMtngProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function SendEmailVeter({ setVisible }: UpdtMtngProps) {
  const goMenu = useNavigate()

  const datos: EmailForm = {
    email: ""
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailForm>({
    defaultValues: datos
  });

  const { mutate } = useMutation({
    mutationFn: sendEmail,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data) 
    }
  })

  const onSub = (data: EmailForm) => {
    reset();
    mutate(data)
    setVisible(false)
  }

  return (
    <>
      <div className="">
        <h1 className="  font-fascinate text-center">Enviar el formulario</h1>
        <div className="">
          <form onSubmit={handleSubmit(onSub)} noValidate className="" >
            <div className=" flex flex-col mt-3  text-center">
              <div className="relative">
                <input id="email" type="email" placeholder="Email" className="input-field"
                  {...register("email", {
                    required: "¡Tu Correo es obligatorio!",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "E-mail no válido",
                    },
                  })} />
                <FaEnvelope className="absolute left-4 top-5 " />
                {errors.email?.type === 'required' && <Errors>{'¡Tu correo es obligatorio!'}</Errors>}
              </div>
            </div>
            <div className=" flex justify-center ">
              <input type="submit" value="Enviar" className={` ${styles.sub} w-1/2 mt-3 text-black font-bold text-xl `} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
