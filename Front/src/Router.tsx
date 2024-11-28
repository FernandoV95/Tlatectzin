import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewUser from './view/Auth/NewUser'
import App from './view/App'
import Layout from './layout/Layout'
import ValidToken from './view/Auth/ValidToken'
import ForgotPass from './view/Auth/ForgotPass'
import ResetPass from './view/Auth/ResetPass'
import Login from './view/Auth/Login'
import RequestToken from './view/Auth/RequestToken'

import Auxiliar from './view/Auxiliar/Auxiliar'
import NewVetery from './view/veterinarios/newVetery'
//<Route element ={<Layout />} >
//</Route>

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path='/' element={<App />} index />

                    {/*Crea un nuevo usuario -*/}
                    <Route path='/user' element={<NewUser />} />

                    {/*Validar la cuenta por el codigo -*/}
                    <Route path='/user/valAcct' element={<ValidToken />} />

                    {/* Iniciar sesion usuarios/Veterinarios/administradores -*/}
                    <Route path='/user/login' element={<Login />} />

                    {/*Solicita cambiar la contraseña ingresando el correo -*/}
                    <Route path='/user/forgotPass' element={<ForgotPass />} />

                    {/*Ingresar el Codigo para cambiar la contraseña*/}
                    <Route path='/user/valTokn' element={<ResetPass />} />

                    {/*Solicita un nuevo Codigo*/}
                    <Route path='/user/reqCod' element={<RequestToken />} />






                    {/*Cambiar contraseña */}
                    <Route path='/user/auxiliar' element={<Auxiliar />} />

                    {/*Crea una nueva cita*/}
                    <Route path='/mtng' element={""} />
                    {/*Modificar tu cita*/}
                    <Route path='/mtng/:idM' element={""} />

                    {/*Nuevo Veterinario*/}
                    <Route path='/veterinarios' element={<NewVetery />} />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

