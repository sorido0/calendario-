import { useDispatch, useSelector } from "react-redux"
import { calendarApp } from "../api";
import { limpiarError, onLogin, onLogout, verificando, } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const pistola = useDispatch();

    const iniciarLogin = async (email, password) => {
        //console.log({ email, password })
        try {
            const response = await calendarApp.post('/auth', { email, password });
            console.log(response)
            const { data } = response;
            if (data) {
                const { token, name, id, ok, msg } = data.useLogin;
                console.log({ token, name, id, ok, msg })
                localStorage.setItem('token', token);
                localStorage.setItem('tokenIniciar', new Date().getTime());
                pistola(verificando());
                pistola(onLogin({ token, name, id, ok, msg }));

            }
            // return data;

        } catch (error) {
            console.log(error.response.data.msg)
            pistola(onLogout(error.response.data.msg));
            setTimeout(() => {
                pistola(limpiarError());
            }, 2000);
        }
    }

    const crearUsuario = async (name, email, password) => {
        try {
            const response = await calendarApp.post('/auth/registrar', { name, email, password });
            console.log(response)
            const { data } = response;
            if (data) {
                const { token, name, id, ok, msg } = data.registrar;

                localStorage.setItem('token', token);
                localStorage.setItem('tokenIniciar', new Date().getTime());
                pistola(verificando());
                pistola(onLogin({ token, name, id, ok, msg }));

            }
            // return data;

        } catch (error) {
            //console.log(error.response.data?.msg)
            //pistola(onLogout(error.response.data.msg));
            setTimeout(() => {
                pistola(limpiarError());
            }, 10);
        }

    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos
        iniciarLogin,
        crearUsuario,
    }
}