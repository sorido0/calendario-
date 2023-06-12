
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './login.css';

const handleLogin = {
    loginPassword: "",
    loginEmail: "",
}

const handleRegister = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
}

export const LoginPages = () => {

    const { loginPassword, loginEmail, onInputChange: loginInpuetChange } = useForm(handleLogin);
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: registerInpuetChange } = useForm(handleRegister);
    const { iniciarLogin, crearUsuario, errorMessage } = useAuthStore();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        iniciarLogin(loginEmail, loginPassword);

        if (errorMessage === 'login') {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Gracias por usar nuestra app'
            })
        }
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerPassword !== registerPassword2) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas deben de ser iguales'
            })
        }
        crearUsuario(registerName, registerEmail, registerPassword);

        if (errorMessage === 'registrar') {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Usuario creado correctamente'
            })
        }
        return;
    }

    useEffect(() => {
        if (errorMessage !== undefined && errorMessage !== 'login' && errorMessage !== 'registrar') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage

            })
        }

    }, [errorMessage])


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-control mb-2">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={loginInpuetChange}
                            />
                        </div>
                        <div className="form-control mb-2">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={loginInpuetChange}
                            />
                        </div>
                        <div className="d-grip gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-control mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={registerInpuetChange}
                            />
                        </div>
                        <div className="form-control mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={registerInpuetChange}
                            />
                        </div>
                        <div className="form-control mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={registerInpuetChange}
                            />
                        </div>

                        <div className="form-control mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={registerInpuetChange}
                            />
                        </div>

                        <div className="d-grip gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}