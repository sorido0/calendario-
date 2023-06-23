import { createSlice } from "@reduxjs/toolkit";


export const calendarioStore = createSlice({
    name: "canlendarioStore",
    eventoActivo: null,
    initialState: {
        isLoading: true,
        eventos: [],
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
            // comparar con el cogido de la secion
            state.eventos = state.eventos.map(
                evento => {
                    if (evento._id === payload._id) {
                        return payload;
                    }

                    return evento;
                }

            )
        },
        deleteEvento: (state, { payload }) => {
            state.eventos = state.eventos.filter(
                evento => evento._id !== payload
            );
            state.eventoActivo = null;
        },
        onLoadEventos: (state, { payload = [] }) => {
            state.isLoading = false;
            // console.log(payload[0])
            payload.forEach(evento => {
                const existe = state.eventos.some(dbEvento => dbEvento._id === evento._id);
                if (!existe) {
                    state.eventos.push(evento);
                }

            }
            )
            state.eventos = payload
        },
    },
    clearEventos: (state) => {
        state.eventos = [];
        state.eventoActivo = null;
    }

});


export const { tienesNotaActica, addNuevoEvento, upEvento, deleteEvento, onLoadEventos, clearEventos } = calendarioStore.actions;
