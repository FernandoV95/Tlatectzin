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
import NewCitas from './view/metting/newCitas'
import UpdateCita from './view/metting/UpdateCita'

//<Route element ={<Layout />} >
//</Route>

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path='/' element={<App />} index />

                    {/* Iniciar sesion usuarios/Veterinarios/administradores */}
                    <Route path='/auth/login' element={<Login />} />
                    {/*Crea un nuevo usuario */}
                    <Route path='/auth/user' element={<NewUser />} />
                    {/*Validar la cuenta por token */}
                    <Route path='/auth/valAcct' element={<ValidToken />} />
                    {/*Solicita un nuevo token*/}
                    <Route path='/auth/ReqToken' element={<RequestToken />} />

                    {/*Se envia un token mediante tu correo*/}
                    <Route path='/auth/forgotPass' element={<ForgotPass />} />
                    {/*Cambiar contraseña */}
                    <Route path='/auth/valTokn' element={<ResetPass />} />

                    {/*Cambiar contraseña */}
                    <Route path='/auxiliar' element={<Auxiliar />} />


                    {/*Crea una nueva cita*/}
                    <Route path='/mtng' element={<NewCitas />} />
                    {/*Modificar tu cita*/} 
                    <Route path='/mtng/:idM' element={<UpdateCita/>} />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

