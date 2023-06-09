

import esEs from 'date-fns/locale/es'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers';
import { BorrarNota, EventoCalendario, ModalEventos, NuevaNota } from '../components';
import { useUiStore, EventosCandelario, useAuthStore } from '../../hooks';
import { useEffect } from 'react';


// Es para poner en español el calendario
const locales = {
    'es': esEs,
}

// Es para poner en español el calendario
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})



export const CalendarView = () => {

    //**  saber cual es el usuario logeado para poder mostrar sus eventos
    const { user } = useAuthStore();

    //* importamos los eventos
    const { eventos, setEventoActivo, iniciarCargaDeLosEventos } = EventosCandelario();

    //* importamos el la funcion o el metodo para abrir el modal
    const { openModel } = useUiStore();

    //console.log(eventos);
    //* 1. Crear un state para guardar la vista del calendario
    // const [vista, setVista] = useState("");
    // localStorage.getItem('lastView', vista);

    const eventStyleGEtter = (event, start, end, isSelected) => {

        const esMyEvento = (event.user._id === user.id);


        const style = {
            backgroundColor: esMyEvento ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const doubleClick = () => {
        // console.log(evetn);
        openModel();
    }

    // es la funcion que se ejecuta cuando se selecciona un evento
    const selecionarEvento = (evetn) => {
        //console.log(evetn);
        setEventoActivo(evetn)
    }

    // es la funcion que se ejecuta cuando se cambia la vista del calendario
    const viewChange = () => {
        //console.log(evetn);
    }

    useEffect(() => {
        iniciarCargaDeLosEventos();
    }, [])

    return (
        <div className="container mb-3">
            <Calendar
                culture='es'
                localizer={localizer}
                events={eventos}
                defaultView='agenda'
                startAccessor="start"
                endAccessor="end"
                style={{ height: 450 }}
                messages={messages()}
                eventPropGetter={eventStyleGEtter}
                components={{
                    event: EventoCalendario
                }}
                onDoubleClickEvent={doubleClick}
                onSelectEvent={selecionarEvento}
                onView={viewChange}
            />

            <ModalEventos />
            <NuevaNota />
            <BorrarNota />
        </div>
    )
}
