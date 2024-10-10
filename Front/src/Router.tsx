import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewUser from './view/Auth/NewUser'
import App from './view/App'
import Layout from './layout/Layout'
import ValidToken from './view/Auth/ValidToken'
import ForgotPass from './view/Auth/ForgotPass'
import ResetPass from './view/Auth/ResetPass'
import Login from './view/Auth/Login'
import RequestToken from './view/Auth/RequestToken'
import NewMeeting from './view/metting/NewMeeting'

//<Route element ={<Layout />} >
//</Route>

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path='/' element={<App />} index />
                    <Route path='/auth/new-user' element={<NewUser />} />
                    <Route path='/auth/confirm-account' element={<ValidToken />} />
                    <Route path='/auth/forgot-pass' element={<ForgotPass />} />
                    <Route path='/auth/new-pass' element={<ResetPass />} />
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/request-token' element={<RequestToken />} />

                    <Route path='/meeting' element={<NewMeeting />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

