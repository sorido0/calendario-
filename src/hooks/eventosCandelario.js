import { useDispatch, useSelector } from "react-redux";
import { tienesNotaActica, addNuevoEvento, upEvento, deleteEvento, onLoadEventos, clearEventos } from "../store/calendario";
import calendarioApi from "../api/calendarioApi";
import { convertirFechasEventos } from "../helpers/convertirFechasEventos";
import Swal from "sweetalert2";







export const EventosCandelario = () => {

    // La pistola de redux para cambiar el estado de la aplicacion
    const dispatch = useDispatch();


    //* useSelector es un hook que permite acceder al store de redux
    const { eventoActivo, eventos, } = useSelector(state => state.condelario);
    //* Estraemos el usuario del store de redux
    const { user } = useSelector(state => state.auth);
    //console.log(user)

    const setEventoActivo = (calenEvento) => {
        //console.log(calenEvento)
        dispatch(tienesNotaActica(calenEvento));
    }

    const guardarEvento = async (evento) => {
        //console.log(evento)


        try {
            if (evento.id) {
                // Acutalizar
                const { data } = await calendarioApi.put(`/events/${evento.id}`, evento);
                console.log(data)
                dispatch(upEvento(evento, user));
                iniciarCargaDeLosEventos();
                return console.log('Actualizado');
            }
            console.log(user)

            // Agregar
            const { data } = await calendarioApi.post('/events/newEventos', evento);
            console.log(data)
            dispatch(addNuevoEvento({ ...evento, id: data.eventos.id, user }));

        } catch (error) {
            console.log(error)
            Swal.fire('No se pudo guardar el evento', error.response.data?.msg, 'error');
        }

        iniciarCargaDeLosEventos();
    }

    const borrarEvento = async () => {


        try {
            await calendarioApi.delete(`/events/${eventoActivo.id}`);
            dispatch(deleteEvento(eventoActivo.id));

        } catch (error) {
            Swal.fire('No se pudo guardar el evento', error.response.data?.msg, 'error');

        }



        iniciarCargaDeLosEventos();
    }

    const iniciarCargaDeLosEventos = async () => {

        try {
            const { data } = await calendarioApi.get('/events/eventos');
            const datosEventos = convertirFechasEventos(data.listaEvento.eventos);
            dispatch(onLoadEventos(datosEventos));

        } catch (error) {
            console.log(error)
            console.log('No se pudo cargar los eventos')
        }
    }


    const limpiarEventos = () => {
        dispatch(clearEventos());
    }






    return {
        //* Propiedades
        eventos,
        eventoActivo,


        //* Funciones o metodos
        guardarEvento,
        setEventoActivo, // Esta funcion es para cambiar el evento activo y recibe un algumento que es el evento activo
        borrarEvento,
        iniciarCargaDeLosEventos,
        limpiarEventos,
    }

}
