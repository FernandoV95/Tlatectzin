type FinalEndProp = {
    fecha: String,
    hora: string,
}

export const inicio = ({ fecha, hora }: FinalEndProp) => {
    return fecha + "T" + hora + ":00";
}

export const final = ({ fecha, hora }: FinalEndProp) => {
    const aux = (+hora.split(':')[0] + 1).toString();
    return fecha + "T" + aux + ":00:00";
}
