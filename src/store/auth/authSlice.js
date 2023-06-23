import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'Verificando', // Verificando, Autenticado, NoAutenticado
        user: {},
        errorMessage: null,
    },
    reducers: {
        verificando: (state) => {
            state.status = 'Verificando'; // Verificando, Autenticado, NoAutenticado
            state.user = {};
            state.errorMessage = null;
        },
        onLogin: (state, payload) => {
            //console.log(payload)
            state.status = 'Autenticado'; // Verificando, Autenticado, NoAutenticado
            state.user = payload.payload;
            state.errorMessage = payload.payload.msg;
        },
        onLogout: (state, { payload }) => {
            state.status = 'NoAutenticado'; // Verificando, Autenticado, NoAutenticado
            state.user = {};
            state.errorMessage = payload;
        },
        limpiarError: (state) => {
            state.errorMessage = null;
        }
    }
})
// Action creators are generated for each case reducer function
export const { verificando, onLogin, onLogout, limpiarError } = authSlice.actions