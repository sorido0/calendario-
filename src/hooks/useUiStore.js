import { useDispatch, useSelector } from "react-redux"
import { abrirModal, cerrarModal } from "../store/ui";




export const useUiStore = () => {
    
    // La pistola de redux para cambiar el estado de la aplicacion
    const dispatch = useDispatch();


    //* useSelector es un hook que permite acceder al store de redux
    const { modalAbierto } =  useSelector( state => state.ui );

    const closeModal = () => {
        dispatch( cerrarModal() );
       // console.log("cerrar modal");
    }

    const openModel = () => {
        dispatch( abrirModal() );
       
    }




    return {
        //* Propiedades
        modalAbierto,

        //* Funciones o metodos
        closeModal,
        openModel
    }

}
