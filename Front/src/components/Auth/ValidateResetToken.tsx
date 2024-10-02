import { useMutation } from "@tanstack/react-query" 
import { toast } from "react-toastify"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import React from "react"
import { ValidTokenForm } from "../../schema/RegisterUser"
import { validateResetToken } from "../../Api/UserApi"

type ValidateResetTokenProps = {
  token: ValidTokenForm['token']
  setToken: React.Dispatch<React.SetStateAction<string>>
  setIsVldTkn: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ValidateResetToken({ token, setToken, setIsVldTkn }: ValidateResetTokenProps) {

  const { mutate } = useMutation({
    mutationFn: validateResetToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (token) => {
      toast.success(token)
      setIsVldTkn(true)
    }
  })

  const handlChange = (token: ValidTokenForm['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ValidTokenForm['token']) => {
    mutate({ token })
  }


  return (
    <>
      <h1>Validar el token para modificar la contraseña</h1>
      <PinInput type={'alphanumeric'} value={token} onChange={handlChange} onComplete={handleComplete}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput >
    </>
  )
}
