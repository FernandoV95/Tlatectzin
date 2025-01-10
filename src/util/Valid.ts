import dayjs from "dayjs";

// Función para validar si la fecha
export const validateDate = (value: string) => {
    const today = dayjs().startOf('day'); 
    const selectedDate = dayjs(value);

    if (selectedDate.isBefore(today)) {
        return 'Fecha Invalida';
    }
    return true; 
};


// Función para validar la hora
export const validateTime = (value: string) => {
    const timeRegex = /^(0[8-9]|1[0-7]):(00|30)$/;

 
    if (!timeRegex.test(value)) {
        return 'Hora no valida';
    }
    
    return true; 
};
