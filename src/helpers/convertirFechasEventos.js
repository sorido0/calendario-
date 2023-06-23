import { parseISO } from "date-fns"



export const convertirFechasEventos = (eventos = []) => {


    return eventos.map((eventos) => {

        eventos.start = parseISO(eventos.start)
        eventos.end = parseISO(eventos.end)


        return eventos
    })


}
