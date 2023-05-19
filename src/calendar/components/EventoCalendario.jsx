

export const  EventoCalendario = (event) => {
  

    const { title, user, nota  } = event.event;
        
  return (
    <div>
        <small>{title}</small>
        <h6>{user.name}</h6>
        <p>{nota}</p>

    </div>
  )
}
