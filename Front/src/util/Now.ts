//'2024-09-21T01:19:00'

export const agno = new Date().getFullYear()
export const mes = 1 + new Date().getMonth()
export const dia = new Date().getDate()


export const start = () => {
    return `${agno}-${mes}-${dia}T09:00:00`

}

export const end = () => { 
    return `${agno}-${mes}-${dia}T10:00:00`

}