import { useState } from "react"
import { ValidTokenForm } from "../../schema/RegisterUser"
import ValidateResetToken from "../../components/Auth/ValidateResetToken"
import NewPass from "../../components/Auth/NewPass"
import styles from "../../modules/validRstCod.module.css"

function ResetPass() {
    const [isVldTkn, setIsVldTkn] = useState(false)
    const [token, setToken] = useState<ValidTokenForm['token']>('')

    return (
        <>
            <div className={`${styles.cajita}`}>
                {!isVldTkn ?
                    <ValidateResetToken
                        token={token}
                        setToken={setToken}
                        setIsVldTkn={setIsVldTkn} />
                    :
                    <NewPass
                        token={token}
                    />}
            </div>
        </>
    )
}

export default ResetPass