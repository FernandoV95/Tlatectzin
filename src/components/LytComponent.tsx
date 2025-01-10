import { FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import { Layout, theme } from 'antd';
import Logo from '../components/Logo';
import MenuList from '../components/MenuList';
import NavMenu from '../components/NavMenu';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


type LytProp = {
    nombres: string;
    rol: string;
};

function LytComponent({ nombres, rol }: LytProp) {

    const { Header, Sider } = Layout;
    const [isLogin, setIsLogin] = useState(true);
    const { token: { colorBgContainer } } = theme.useToken();
    const rutas = ['/auth/login', '/auth/sendCod', '/auth/valAcct', '/user/new']
    const { pathname } = useLocation();


    useEffect(() => {
        setIsLogin(!rutas.some(route => pathname.startsWith(route)));
    }, [pathname]);


    return (
        <Layout>
            <Sider collapsed={true} collapsible trigger={null}>
                <Logo />
                <MenuList rol={rol} />
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {isLogin && (
                        !nombres ? (
                            <div className='flex justify-end items-center mr-10 mt-3'>
                                <NavLink to={"/auth/login"} className="no-underline flex items-center">
                                    <h4 className='text-lg mr-2 flex items-center'>Iniciar sesión</h4>
                                    <FaUser className='text-2xl' />
                                </NavLink>
                            </div>
                        ) : (
                            <div className='flex justify-end items-center mr-10 mt-3'>
                                <NavMenu name={nombres} />
                            </div>
                        )
                    )}



                </Header>

                <main>
                    <Outlet />
                </main>

                <footer>
                    <p className="text-center mt-1">
                        &copy; Todos los derechos reservados {new Date().getFullYear()}
                    </p>

                    <div className='flex w-1/2 m-auto justify-around text-3xl'>
                        <div className="contenedor facebook flex justify-center items-center">
                            <Link to={"https://www.facebook.com/vidanimalia?locale=es_LA"} target="_blank" className=' no-underline text-black'>
                                <i className="fa-brands fa-facebook-f " />
                            </Link>
                        </div>

                        <div className="contenedor youtube flex justify-center items-center" >
                            <Link to={"https://www.youtube.com/watch?v=LZ9AKsUCcTI"} target="_blank" className=' no-underline text-black'>
                                <i className="fa-brands fa-youtube" />
                            </Link>
                        </div>
                        <div className="contenedor instagram flex justify-center items-center">
                            <Link to={"https://www.instagram.com/peta/"} target="_blank" className=' no-underline text-black'>
                                <i className="fa-brands fa-instagram" />

                            </Link>
                        </div>
                    </div>
                </footer>

            </Layout>
        </Layout>
    )
}

export default LytComponent