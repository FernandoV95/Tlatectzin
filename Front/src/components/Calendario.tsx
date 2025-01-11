import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import { useState, useEffect } from 'react';

type CalendarioProps = {
    value: Dayjs | null;
    setValue: (value: Dayjs | null) => void;
    fechaInicial: string;
    validHour: string;
}

function Calendario({setValue, fechaInicial, validHour }: CalendarioProps) {
    const [currentHour, setCurrentHour] = useState(validHour);

    const initialValue = dayjs(fechaInicial, 'YYYY-MM-DD HH:mm');

    useEffect(() => {
        setCurrentHour(validHour);
    }, [validHour]);

    const handleChange = (value: Dayjs | null) => {
        setValue(value);
    };

    // Invalida fines de semana y el dia actual
    const disabledDate = (current: Dayjs) => {
        return current.isBefore(dayjs(), 'day') || current.isSame(dayjs(), 'day') || current.day() === 0 || current.day() === 6;
    };


    return (
        <DatePicker
            format="YYYY-MM-DD HH:mm"
            value={initialValue}
            showNow={false}
            showTime={{
                format: 'HH:mm',
                minuteStep: 30,
                defaultValue: dayjs(currentHour, 'HH:mm'),
                hideDisabledOptions: true,
                disabledTime: () => ({
                    disabledHours: () => {
                        const hours = [];
                        // Deshabilitar todas las horas antes de las 9:00 AM
                        for (let i = 0; i < 8; i++) {
                            hours.push(i); // Deshabilita horas de 0 a 8
                        }
                        for (let i = 18; i < 24; i++) {
                            hours.push(i); // Deshabilita horas de 18 en adelante (después de las 5 PM)
                        }
                        return hours;
                    }
                })
            }}
            suffixIcon={null}
            disabledDate={disabledDate}
            onChange={handleChange}
            style={{
                width: '100%',
            }}
        />
    );
}

export default Calendario;
