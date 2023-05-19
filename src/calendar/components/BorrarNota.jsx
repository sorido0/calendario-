import { BsFillTrash3Fill } from "react-icons/bs"
import { EventosCandelario } from "../../hooks";




export const BorrarNota = () => {


    const { eventoActivo, borrarEvento, setEventoActivo } = EventosCandelario();

    const deliteNota = () => {
        borrarEvento(eventoActivo);
        setEventoActivo(null);
    }



  return (
    <button 
        className="btn btn-danger fab-danger"
        onClick={ deliteNota  }
    >
        <BsFillTrash3Fill />
    </button>
  )
}

