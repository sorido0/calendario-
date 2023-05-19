import { useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { useMemo } from 'react';
import { EventosCandelario, useUiStore } from '../../hooks';




registerLocale('es', es)




const estilosModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export const ModalEventos = () => {
    Modal.setAppElement('#root');

    const { modalAbierto, closeModal  } = useUiStore();
    const { eventoActivo, guardarEvento  }  = EventosCandelario();
    //console.log(eventoActivo);
    
    const [SeEnvio, setSeEnvio] = useState(false)

    const [formValue, setFormValue] = useState({
        title: '',
        nota: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    
    const esCuchaLosImpuet = ({ target }) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }
    
    const claseTituloNora = useMemo(() => {
        if (!SeEnvio) return "";
        let clTitulo = "";
        let clNota = "";
        
        if (formValue.title.length < 2) {
            clTitulo = 'is-invalid';
        } else {
            clTitulo = 'is-valid';
        }
        
        if (formValue.nota.length < 2) {
            clNota = 'is-invalid';
        } else {
            clNota = 'is-valid';
        }
        
        
        return {clNota , clTitulo} ;
        
    }, [formValue.title, formValue.nota, SeEnvio])
    
    useEffect(() => {

        if (eventoActivo != null ) return setFormValue({...eventoActivo});
    }, [eventoActivo])
    
   
    const cerrarModal = () => {
       closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarEvento(formValue);
        setSeEnvio(false);


        const direfenciaHoras = differenceInSeconds(formValue.end, formValue.start);

        if (isNaN(direfenciaHoras) || direfenciaHoras < 0) {
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
        }

        if (formValue.title.trim().length < 2) {
            return Swal.fire('Error', 'El titulo debe tener mas de 2 letras', 'error');
        }

        if (formValue.nota.trim().length < 2) {
            return Swal.fire('Error', 'La nota debe tener mas de 2 letras', 'error');
        }
        cerrarModal()
    }

    return (
        <div>

            <Modal
                isOpen={ modalAbierto }
                style={estilosModal}
                onRequestClose={cerrarModal}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}

            >
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={handleSubmit}>

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={formValue.start}
                            onChange={(date) => setFormValue({ ...formValue, start: date })}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            locale={es}
                            timeCaption="Hora"
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        <DatePicker
                            minDate={formValue.start}
                            selected={formValue.end}
                            onChange={(date) => setFormValue({ ...formValue, end: date })}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Hora"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            locale={es}
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control 
                            ${claseTituloNora.clTitulo
                                } `
                            }
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValue.title}
                            onChange={esCuchaLosImpuet}
                        />
                        <small className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className={`form-control 
                            ${
                                claseTituloNora.clNota
                            }
                            `}
                            placeholder="Nota"
                            rows="5"
                            name="nota"
                            value={formValue.nota}
                            onChange={esCuchaLosImpuet}
                        ></textarea>
                        <small className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    )
}
