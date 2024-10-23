import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { validateAccountToken } from "../../Api/UserApi"
import { toast } from "react-toastify"
import { ValidTokenForm } from "../../schema/RegisterUser"
import { Link, useNavigate } from 'react-router-dom'


function ValidToken() {
  const goMenu = useNavigate()

  const [token, setToken] = useState<ValidTokenForm['token']>('')

  const { mutate } = useMutation({
    mutationFn: validateAccountToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (token) => {
      toast.success(token)
      goMenu('/auth/login')
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
      <div className='caja h-lvh '>
        <div className="pt-36">
          <h1 className="  font-fascinate text-center text-white">Ingresa tu codigo</h1>
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

          <div className='flex justify-center pt-8 text-white text-lg w-4/5 m-auto '>
            <p>¿Tu codigo ya expiro?</p>
            &nbsp;
            <Link
              to={"/auth/ReqToken"}
              className="no-underline text-white transform scale-90 hover:scale-100 transition-transform duration-200"
            >
              Solicita uno nuevo
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ValidToken