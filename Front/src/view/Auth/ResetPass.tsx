import { useState } from "react" 
import ValidateResetToken from "../../components/Auth/ValidateResetToken"
import NewPass from "../../components/Auth/NewPass"
import styles from "../../modules/validRstCod.module.css"
import { ValidCodForm } from "../../schema/Users"

function ResetPass() {
    const [isVldTkn, setIsVldTkn] = useState(false)
    const [token, setToken] = useState<ValidCodForm['token']>('')

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