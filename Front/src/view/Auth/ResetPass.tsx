import { useState } from "react"
import { ValidTokenForm } from "../../schema/RegisterUser"
import ValidateResetToken from "../../components/Auth/ValidateResetToken"
import NewPass from "../../components/Auth/NewPass"

function ResetPass() {
    const [isVldTkn, setIsVldTkn] = useState(false)
    const [token, setToken] = useState<ValidTokenForm['token']>('')

    return (
        <>
            {!isVldTkn ?
                <ValidateResetToken
                    token={token}
                    setToken={setToken}
                    setIsVldTkn={setIsVldTkn} />
                :
                <NewPass
                    token={token}
                />}
        </>
    )
}

export default ResetPass