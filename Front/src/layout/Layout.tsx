import { FaUser } from 'react-icons/fa';
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Layout, theme } from 'antd';
import Logo from '../components/Logo';
import MenuList from '../components/MenuList';
import { useEffect, useState } from 'react';
import ToggleThemeBtn from '../components/ToggleThemeBtn';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';



export default function AppLayout() {


  const { Header, Sider } = Layout;
  const [darkTheme, setDarkTheme] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const { pathname } = useLocation()

  const { token: { colorBgContainer } } = theme.useToken();

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  const rutas=['/auth/login','/auth/new-user','/auth/forgot-pass']

  useEffect(() => { 
    setIsLogin(!rutas.includes(pathname));
  }, [pathname]); 
  
  return (
    <>

      <Layout>
        <Sider collapsed={collapsed} collapsible trigger={null} className='sidebar' theme={darkTheme ? 'dark' : 'light'}>
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeBtn darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="flex items-center justify-between mr-10 mt-3">

              <Button
                type='text'
                className='toggle'
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
              {isLogin && (
                <div className='flex items-center'>
                  <NavLink to={"/auth/login"} className="no-underline flex items-center">
                  <h4 className='text-lg mr-2 flex items-center'>Iniciar sesión</h4>
                    <FaUser className='text-2xl' />
                  </NavLink>
                </div>
              )}

            </div>
          </Header>

          <main>
            <Outlet />
          </main>

          <footer>
            <p className="text-center mt-4">
              &copy; Todos los derechos reservados {new Date().getFullYear()}
            </p>
          </footer>

        </Layout>
      </Layout>





      <ToastContainer
        className="custom-toast-container"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeButton
        pauseOnHover
        draggable
        theme="light"
      />

    </>
  )
}
