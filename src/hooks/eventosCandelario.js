import { useDispatch, useSelector } from "react-redux";
import { tienesNotaActica, addNuevoEvento, upEvento, deleteEvento } from "../store/calendario";






export const EventosCandelario = () => {
    
    // La pistola de redux para cambiar el estado de la aplicacion
    const dispatch = useDispatch();


    //* useSelector es un hook que permite acceder al store de redux
    const { eventoActivo, eventos,} =  useSelector( state => state.condelario );
    
    const setEventoActivo = (calenEvento) => {
        //console.log(calenEvento)
        dispatch( tienesNotaActica(calenEvento) );
    }

    const guardarEvento = (evento) => {

        if(evento._id) {
            dispatch( upEvento(evento) );
            return console.log('Actualizado');
        }
        
        dispatch( addNuevoEvento({ ...evento, _id: new Date().getTime() }) );
    }

    const borrarEvento = (evento) => {
        console.log(evento)
        dispatch( deleteEvento(evento) );
    }




    return {
        //* Propiedades
        eventos,
        eventoActivo,
       

        //* Funciones o metodos
       guardarEvento,
       setEventoActivo, // Esta funcion es para cambiar el evento activo y recibe un algumento que es el evento activo
       borrarEvento,
    }

}
