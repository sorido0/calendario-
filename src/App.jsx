import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { Provider } from "react-redux"
import { store } from "./store/store"


function App() {


    return (
        // aqui va el provider
        // el store es el que tiene el estado global
        <Provider store={store}>
            {/* aqui va el router BrowserRouter es para tener todas las rutas */}
            <BrowserRouter>
                {/* Aqui llamamos la aplicacion */}
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}

export default App
