import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewUser from './view/Users/NewUser'
import App from './view/App'
import Layout from './layout/Layout'
import ValidToken from './view/Auth/ValidToken'
import ForgotPass from './view/Auth/ForgotPass'
import ResetPass from './view/Auth/ResetPass'
import Login from './view/Auth/Login'
import RequestToken from './view/Auth/RequestToken'

import Meetings from './view/Citas/Meetings'
import Auxiliar from './view/Auxiliar/Auxiliar'
import SendEmailVeter from './view/Adminds/SendEmailVeter'
import NewVeterinary from './view/Users/NewVeterinary'
import ShowMtngs from './view/Citas/ShowMtngs'
//<Route element ={<Layout />} >
//</Route>

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path='/' element={<App />} index />

                    {/*-------> Rutas de los usuarios <-------*/}
                    {/*Registrar un nuevo usuario -*/}
                    <Route path='/user/new' element={<NewUser />} />
                    {/*Registrar un nuevo veterinario -*/}
                    <Route path='/user/newVeter' element={<NewVeterinary />} />

                    {/*-------> Rutas de autenticacion <-------*/}
                    {/* Iniciar sesion */}
                    <Route path='/auth/login' element={<Login />} />
                    {/*Validar la cuenta mediante el codigo -*/}
                    <Route path='/auth/valAcct' element={<ValidToken />} />
                    {/*Solicitar CODIGO por mensaje para cambiar la contraseña -*/}
                    <Route path='/auth/sendCod' element={<ForgotPass />} />
                    {/*Validar el Codigo para cambiar la contraseña*/}
                    <Route path='/auth/valCodUpdtPss' element={<ResetPass />} />
                    {/*Solicita un nuevo Codigo*/}
                    <Route path='/auth/reqCod' element={<RequestToken />} />

                    {/*-------> Rutas para las citas <-------*/}
                    {/*Crea una nueva cita*/}
                    <Route path='/mtng/new' element={<Meetings />} />

                    {/*Ver citas*/}
                    <Route path='/mtng/show' element={<ShowMtngs />} />

                    {/*Modificar tu cita*/}
                    <Route path='/mtng/:idM' element={""} />

                    {/*Cancelar tu cita*/}
                    <Route path='/mtng/cancel/:idM' element={""} />

                    {/*-------------------------------------------------- */}
                    {/*Enviar el correo al veterinario para registrarse*/}
                    <Route path='/admind/sendEmailVeter' element={<SendEmailVeter />} />


                    {/*PAginas Auxiliares */}
                    <Route path='/Auxiliar' element={<Auxiliar />} />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

