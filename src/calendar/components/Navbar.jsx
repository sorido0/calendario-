import { FcCalendar } from "react-icons/fc";
import { IoMdExit } from "react-icons/io";

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-black mb-4 px-4">
       
        <span className="navbar-brand">
         <FcCalendar />
         &nbsp; Calendario
        </span>

        <button className="btn btn-outline-danger">
             <IoMdExit />
            <span className="p-1">Salir</span>
        </button>


    </div>
  )
}
