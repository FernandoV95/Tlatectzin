const meses = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export function obtFch(fecha: string) {
    let aux = fecha.slice(0, 15); 
    const [diaNom,mes,diaNum,anio]=aux.split(' ')
    let Mes = ''
    const auxMes = meses.indexOf(mes) + 1
    if (auxMes < 10) {
        Mes = "0" + auxMes;  // Si es un mes de 1 a 9, agregamos el "0" adelante
    } else {
        Mes = auxMes.toString();  // Si es un mes de 10 a 12, lo dejamos tal cual
    }
    return `${anio}-${Mes}-${diaNum}`
}

