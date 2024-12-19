import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Errors from '../Errors'
import { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import styles from "../../modules/newPass.module.css"
import { UpdtPssForm, ValidCodForm } from '../../schema/Users'
import { updtPss } from '../../Api/UserApi'


type NewPasswordFormProps = {
  token: ValidCodForm['token']
}


function NewPass({ token }: NewPasswordFormProps) {

  const [hiden, setHiden] = useState<boolean>(false);
  const [hiden2, setHiden2] = useState<boolean>(false);

  const Show = () => {
    setHiden(prevHiden => !prevHiden);
  };

  const Show2 = () => {
    setHiden2(prevHiden => !prevHiden);
  };
  const goMenu = useNavigate()

  const initialValues: UpdtPssForm = {
    pass: '',
    pass_confirm: ''
  }
  const { register, getValues, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updtPss,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (datos) => {
      toast.success(datos)
      goMenu('/auth/login')
    }
  })

  const handleNewPassword = (formData: UpdtPssForm) => {
    const datos = {
      formData, token
    };
    console.log(datos)
    mutate(datos)
  };

  return (
    <>
      <div className="caja h-lvh">
        <div className="pt-8">
          <h1 className="  font-fascinate text-center text-white">Actualiza tu contraseña</h1>

          <form onSubmit={handleSubmit(handleNewPassword)} noValidate className="w-4/5 m-auto" >


            <div className=" flex flex-col mt-3 ">
              <div className="relative">
                <input id="pass" type={hiden ? 'text' : 'password'} placeholder="Contraseña" className="input-field" {...register('pass', { required: true })} />
                <FaLock className="absolute left-4 top-5 text-white" />
                {hiden ?
                  <i className="bi bi-eye-slash-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show}></i>
                  :
                  <i className="bi bi-eye-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show}></i>
                }
                {errors.pass?.type === 'required' && <Errors>{'¡Tu contraseña es obligatoria!'}</Errors>}
              </div>
            </div>


            <div className=" flex flex-col mt-3 ">
              <div className="relative">
                <input id="pass_confirm" type={hiden2 ? 'text' : 'password'} placeholder="Repite tu contraseña" className="input-field" {...register("pass_confirm",
                  {
                    required: "¡Repite tu contraseña!",
                    validate: v => v === getValues('pass') || "¡Las contraseñas no coinciden!"
                  })} />
                <FaLock className="absolute left-4 top-5 text-white" />
                {hiden2 ?
                  <i className="bi bi-eye-slash-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show2}></i>
                  :
                  <i className="bi bi-eye-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show2}></i>
                }
                {errors.pass_confirm && <Errors>{errors.pass_confirm.message}</Errors>}
              </div>
            </div>
            <div className=" mt-3 mb-3 text-center">
              <input type="submit" value="Actualizar" className={`${styles.sub} w-1/2 text-2xl  text-black font-bold `} />
            </div>
          </form>

        </div>
      </div>

    </>

  )
}

export default NewPass