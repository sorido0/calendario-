import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages } from "../auth";
import { CalendarPages } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {

    // llamamos la validacion del useaUthStore nececitamos el meotodo verificandotoken  del token para ver si estra logeado
    const { status, verificandoToken } = useAuthStore();

    useEffect(() => {
        return () => {
            verificandoToken()
        }
    }, [])


    // aqui se verifica si el usuario esta logeado para dar acceso a las rutas privadas
    if (status === 'Verificando') {
        return <h1>Verificando...</h1>
    }


    return (
        // aqui se ponen todas las rutas dentro de Routes
        <Routes>


            {
                // Si el usuario esta logeado se le da acceso a las rutas privadas
                (status === 'NoAutenticado')
                    // Si el usuario esta logeado se le da acceso a las rutas del calendario
                    ? (
                        <>

                            <Route path="/auth/login/" element={<LoginPages />} />
                            {/* Si el usuario esta no esta logeado se le redirige a la ruta /auth/login */}
                            <Route path="/*" element={<Navigate to="/auth/login/" />} />
                        </>
                    )
                    // Si el usuario no esta logeado se le da acceso a las rutas de autenticacion
                    : (
                        <>

                            <Route path="/" element={<CalendarPages />} />,
                            { /* Si el usuario esta no esta logeado se le redirige a la ruta /auth/login */}
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )

            }
        </Routes>
    )
}
