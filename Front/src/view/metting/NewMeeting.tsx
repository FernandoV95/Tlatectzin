import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { agno, dia, end, mes, start } from '../../util/Now';
dayjs.locale('es');


interface EventType {
    start: Date;
    end: Date;
    title: string;
    data: {
        comentarios: string;
        status: string;
    };
}

export default function NewMeeting() {
    const localizer = dayjsLocalizer(dayjs);

    const events: EventType[] = [
        {
            start: dayjs(start()).toDate(),
            end: dayjs(end()).toDate(),
            title: "Adopción",
            data: {
                comentarios: "Aqui hay un comentario",
                status: "Pendiente"
            }
        }
    ];

    const Event = ({ event }: { event: EventType }) => {
        return (  
                <span className=''>
                    <strong className=''>{event.title}</strong>
                    <br />
                    <small>{event.data.comentarios}</small>
                    <br />
                    <small>{event.data.status}</small>
                </span> 

        );
    };

    const components = {
        event: Event
    };


    return (
        <div className='caja-calendario container'>
            <Calendar
                localizer={localizer}
                events={events}
                views={['day', 'agenda']} // Solo habilita las vistas de 'day' y 'agenda'
                defaultView='day'
                min={new Date(agno, mes, dia, 9, 0, 0)} // 9:00 AM
                max={new Date(agno, mes, dia, 15, 30, 0)} // 3:30 PM 
                components={components}
                messages={{
                    today: 'Hoy',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento',
                }}
            />

        </div>
    );
}

