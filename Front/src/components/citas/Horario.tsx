import { useState } from 'react';
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Asegúrate de tener el idioma español

// Extiende la interfaz de Dayjs para agregar las propiedades personalizadas
declare module 'dayjs' {
    interface Dayjs {
        $M: number;
        $m: number;
    }
}

const Horario = ({ setHorario }) => {
    const [time, setTime] = useState<Dayjs | null>(null);

    const handleChange = (value: Dayjs | null) => {
        if (value) {
            // Formatea la hora y la pasa al estado padre
            const formattedTime = value.format('HH:mm');
            setHorario(formattedTime);
            setTime(value);
        }
    };



    const disabledTime = () => {
        return {
            disabledHours: () => {
                let hours: number[] = [];
                for (let i = 0; i < 9; i++) {
                    hours = [...hours, i];
                }
                for (let i = 17; i < 24; i++) {
                    hours = [...hours, i];
                }
                return hours;
            },
            disabledMinutes: () => {
                return [];
            },
            disabledSeconds: () => {
                return [];
            },
        };
    };

    return (
        <div>
            <TimePicker
            className="input-field"
                value={time}
                onChange={handleChange}
                format="HH:mm"
                use12Hours={false}
                minuteStep={30}
                disabledTime={disabledTime} // Usar disabledTime en lugar de disabledHours
                hideDisabledOptions
                showNow={false}
                suffixIcon={null}
            />
        </div>
    );
};

export default Horario;
