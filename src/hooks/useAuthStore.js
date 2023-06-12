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

            if (error.response.data.errors.email?.msg) {
                pistola(onLogout(error.response.data.errors.email.msg));
            }

            if (error.response.data.errors.name?.msg) {
                pistola(onLogout(error.response.data.errors.name.msg));
            }

            if (error.response.data.errors.password?.msg) {
                pistola(onLogout(error.response.data.errors.password.msg));
            }

            if (error.response.data?.msg) {
                pistola(onLogout(error.response.data.msg));
            }

            setTimeout(() => {
                pistola(limpiarError());
            }, 10);
        }

    }

    const verificandoToken = async () => {
        const toke = localStorage.getItem('token');
        if (!toke) {
            return pistola(onLogout(undefined));
        }


        try {
            const { data } = await calendarApp.get('/auth/nuevotk');
            console.log(data)

            if (data) {
                const { name, id, token } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('tokenIniciar', new Date().getTime());
                pistola(verificando());
                pistola(onLogin({ name, id }));
            }
            // return data;

        } catch (error) {
            localStorage.clear();
            pistola(onLogout(undefined));
        }
    }

    const cerrarSesion = () => {
        localStorage.clear();
        pistola(onLogout(undefined));
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos
        iniciarLogin,
        crearUsuario,
        verificandoToken,
        cerrarSesion
    }
}