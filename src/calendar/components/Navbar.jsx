import { FcCalendar } from "react-icons/fc";
import { IoMdExit } from "react-icons/io";
import { useAuthStore } from "../../hooks";

export const Navbar = () => {

  const { cerrarSesion, user } = useAuthStore()
  console.log(user.payload.name)
  return (
    <div className="navbar navbar-dark bg-black mb-4 px-4">

      <span className="navbar-brand">
        <FcCalendar />
        &nbsp; {user.payload.name}
      </span>

      <button className="btn btn-outline-danger" onClick={cerrarSesion}>
        <IoMdExit />
        <span className="p-1">Salir</span>
      </button>


    </div>
  )
}
