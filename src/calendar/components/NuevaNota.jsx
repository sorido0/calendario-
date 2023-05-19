
import { BsPlusCircle } from 'react-icons/bs'
import { EventosCandelario, useUiStore } from '../../hooks'
import { addHours } from 'date-fns';



export const NuevaNota = () => {

  const { setEventoActivo } = EventosCandelario();
  const { openModel } = useUiStore();

  const abrirNuevaNota = () => {
    //console.log('abrirNuevaNota')
    setEventoActivo({
      title: '',
      nota: '',
      allDay: true,
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#f00',
      user: {
          id: 123,
          name: 'Angel',
          lastName: 'Soriano'
  
      }
    })
    openModel()
  }


  return (
    <button 
      className="btn btn-primary fab"
      onClick={ abrirNuevaNota }
    >
        <BsPlusCircle />
    </button>
  )
}
