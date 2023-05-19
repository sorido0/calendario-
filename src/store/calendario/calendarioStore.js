import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const eventosTemporales = [
    {
        _id: new Date().getTime(),
        title: 'La mamada',
        nota: 'Me lo mame bien rico',
        allDay: true,
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#f00',
        user: {
            id: 123,
            name: 'Angel',
            lastName: 'Soriano'

        }
    }
];


export const calendarioStore = createSlice({
    name: "canlendarioStore",
    eventoActivo: null,
    initialState: {
        eventos: eventosTemporales,
        eventoActivo: null,
    },
    reducers: {
        //* El payload es el valor que se le asigna a la accion o valor que se le pasa a la accion
        tienesNotaActica: (state, { payload }) => {
            state.eventoActivo = payload;
        },
        cerrarModal: (state) => {
            state.modalAbierto = false;

        },
        addNuevoEvento: (state, { payload }) => {
            state.eventos.push(payload);
            state.eventoActivo = null;
        },
        upEvento: (state, { payload }) => {
            state.eventos = state.eventos.map(
                evento => {
                    if (evento._id === payload._id) {
                        return payload;
                    }

                    return evento;
                }

            )
        },
        deleteEvento: ( state ) => {
            state.eventos = state.eventos.filter(
                evento => evento._id !== state.eventoActivo._id
            );
            state.eventoActivo = null;
        }




    }

});


export const { tienesNotaActica, addNuevoEvento, upEvento, deleteEvento } = calendarioStore.actions;
