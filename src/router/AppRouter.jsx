import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages } from "../auth";
import { CalendarPages } from "../calendar";





export const AppRouter = () => {

    
    const estado = 'Si-login';
    
    return (
        <Routes>


            {
                (estado === 'Si-login' )
                    ? <Route path="/calendar" element={<CalendarPages />} />
                    : <Route path="/auth/*" element={<LoginPages />} />
                    
            }
           

            <Route path="/*" element={<Navigate to="/auth/login" />} />


        </Routes>
    )
}
