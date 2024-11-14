import { useState } from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import CalendarLocale from 'antd/es/calendar/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 
import { obtFch } from '../../util/Mouth'; 
dayjs.locale('es');

declare module 'dayjs' {
    interface Dayjs {
        $d: Date;
    }
}

type fechaProps = { 
    setHizuke: React.Dispatch<React.SetStateAction<string>>
}

const Fecha = ({ setHizuke }:fechaProps) => {
    //Obtenemos la fecha de de hoy
    const hoy = dayjs().startOf('day')
    
    const onSelect = (newValue: Dayjs) => {
        const { $d } = newValue; 
        const aux = obtFch($d.toString().slice(0,15)) 
        setHizuke(aux);
    };



    return (
        <Calendar
            fullscreen={false}
            locale={CalendarLocale}
            onSelect={onSelect}
            //Deshabilitar fechas pasadas, actual y fines de semana
            disabledDate={(date) => {
                const esFin = date.day() === 0 || date.day() === 6;
                return date.isBefore(hoy, 'day') || date.isSame(hoy, 'day') || esFin;
            }}
            //Solo va a mostrar el año actual y el siguiente
            validRange={[dayjs().startOf('year'), dayjs().endOf('year').add(1, 'year')]}
        />

    );
};

export default Fecha