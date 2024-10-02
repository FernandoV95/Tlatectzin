import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { validateAccountToken } from "../../Api/UserApi"
import { toast } from "react-toastify"
import { ValidTokenForm } from "../../schema/RegisterUser"
import { useNavigate } from 'react-router-dom'


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
      goMenu('/')
    }
  })

  const handlChange = (token: ValidTokenForm['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ValidTokenForm['token']) => {
    mutate({token})
  }



  return (
    <>
      <h1>Token</h1>
      <PinInput type={'alphanumeric'}  value={token} onChange={handlChange} onComplete={handleComplete}>
      <PinInputField  />
      <PinInputField  />
      <PinInputField  />
      <PinInputField  />
      <PinInputField  />
      <PinInputField  />
    </PinInput >

    </>
  )
}

export default ValidToken