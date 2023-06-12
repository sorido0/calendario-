import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages } from "../auth";
import { CalendarPages } from "../calendar";

export const AppRouter = () => {

    // aqui se verifica si el usuario esta logeado para dar acceso a las rutas privadas
    const estado = 'Verificando';

    return (
        // aqui se ponen todas las rutas dentro de Routes
        <Routes>


            {
                // Si el usuario esta logeado se le da acceso a las rutas privadas
                (estado === 'Si-login')
                    // Si el usuario esta logeado se le da acceso a las rutas del calendario
                    ? <Route path="/calendar" element={<CalendarPages />} />
                    // Si el usuario no esta logeado se le da acceso a las rutas de autenticacion
                    : <Route path="/auth/*" element={<LoginPages />} />

            }

            {/* Si el usuario esta no esta logeado se le redirige a la ruta /auth/login */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />


        </Routes>
    )
}
