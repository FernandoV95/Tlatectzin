import React from "react"

function Errors({ children }: 
               { children: React.ReactNode }) {
    return (
        <div className="text-center my-2 bg-red-100 text-red-600 font-bold p-1 text-sm rounded">
            {children}
        </div>
    )
}

export default Errors

