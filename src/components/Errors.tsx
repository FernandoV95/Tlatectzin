import React from "react"

function Errors({ children }: 
               { children: React.ReactNode }) {
    return (
        <div className="text-center mt-1 bg-red-100 text-red-600 font-bold text-sm rounded flex justify-center items-center">
            {children}
        </div>
    )
}

export default Errors

