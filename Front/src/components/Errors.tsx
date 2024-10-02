import React from "react"

function Errors({ children }: 
               { children: React.ReactNode }) {
    return (
        <div className=" ">
            {children}
        </div>
    )
}

export default Errors

