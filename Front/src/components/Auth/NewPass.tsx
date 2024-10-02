import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import { PassResetForm, ValidTokenForm } from '../../schema/RegisterUser'
import { resetPass } from '../../Api/UserApi'
import Errors from '../Errors'


type NewPasswordFormProps = {
  token: ValidTokenForm['token'],
}


function NewPass({ token }: NewPasswordFormProps) {
  const goMenu = useNavigate()

  const initialValues: PassResetForm = {
    pass: '',
    pass_confirm: ''
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: resetPass,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (datos) => {
      toast.success(datos)
      goMenu('/')
    }
  })


  const handleNewPassword = (formData: PassResetForm) => {
    const datos = {
      formData,
      token
    }
    mutate(datos)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >

        <div className=" flex flex-col mt-3">
          <label htmlFor="pass"><span className="text-red-700">*</span> Contraseña</label>
          <input id="pass" type='password' {...register('pass', { required: true })} />
          {errors.pass?.type === 'required' && <Errors>{'¡La contraseña es obligatoria!'}</Errors>}
        </div>

        <div className=" flex flex-col mt-3">
          <label htmlFor="confirm_pass"><span className="text-red-700">*</span> Confirmar contraseña</label>
          <input id="confirm_pass" type="password" className="form-control" {...register("pass_confirm", {
              required: "¡Repite tu contraseña!",
              validate: value => value === initialValues.pass || 'Los passwords no son iguales'
            })}
          />
          {errors.pass_confirm && <p>{errors.pass_confirm.message}</p>}
        </div>

        <input type="submit" value='Reestablecer contraseña'
        />
      </form>
    </>

  )
}

export default NewPass