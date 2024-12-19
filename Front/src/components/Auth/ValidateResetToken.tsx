import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import React from "react" 
import { valCodUpdtPss } from "../../Api/AuthApi"
import { ValidCodForm } from "../../schema/Users"

type ValidateResetTokenProps = {
  token: ValidCodForm['token']
  setToken: React.Dispatch<React.SetStateAction<string>>
  setIsVldTkn: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ValidateResetToken({ token, setToken, setIsVldTkn }: ValidateResetTokenProps) {

  const { mutate } = useMutation({
    mutationFn: valCodUpdtPss,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (token) => {
      toast.success(token)
      setIsVldTkn(true)
    }
  })

  const handlChange = (token: ValidCodForm['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ValidCodForm['token']) => {
    mutate({ token })
  }


  return (
    <>
      <div className='caja h-lvh '>
        <div className="pt-36">
          <h1 className="  font-fascinate text-center text-white">Ingresa tu codigo de verificación</h1>
          <PinInput type={'alphanumeric'} value={token} onChange={handlChange} onComplete={handleComplete}>
            <div className=" w-4/5 pt-8 m-auto flex justify-evenly">
              <PinInputField className="w-16 h-24 border-4 border-green-700 rounded text-center text-6xl font-silkscreen" />
              <PinInputField className="w-16 h-24 border-4 border-green-700 rounded text-center text-6xl font-silkscreen " />
              <PinInputField className="w-16 h-24 border-4 border-green-700 rounded text-center text-6xl font-silkscreen" />
              <PinInputField className="w-16 h-24 border-4 border-green-700 rounded text-center text-6xl font-silkscreen" />
              <PinInputField className="w-16 h-24 border-4 border-green-700 rounded text-center text-6xl font-silkscreen" />
              <PinInputField className="w-16 h-24 border-4 border-green-700 rounded text-center text-6xl font-silkscreen" />
            </div>
          </PinInput >
        </div>
      </div>
    </>
  )
}
