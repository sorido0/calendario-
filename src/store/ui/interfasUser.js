import { createSlice } from "@reduxjs/toolkit";

 


 export const interfasUser = createSlice({
    name: "interfasUser",
    initialState: {
        modalAbierto : false,
    },
    reducers: {
        // a las aciones se le asignan valores con el signo de igual (=)
        abrirModal: (state) => {
            state.modalAbierto = true;
        },
        cerrarModal: (state) => {
            state.modalAbierto =  false;
           
        }

    }
    
});


export const { abrirModal, cerrarModal } = interfasUser.actions;
