import { FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Layout, theme } from 'antd';
import Logo from '../components/Logo';
import MenuList from '../components/MenuList';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import { useAuth } from '../Hooks/UserAuth';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import LytComponent from '../components/LytComponent';
import TstCmpnt from '../components/TstCmpnt';

export default function AppLayout() {
  const [isLogin, setIsLogin] = useState(true);

  const { token: { colorBgContainer } } = theme.useToken();
  const rutas = ['/auth/login', '/auth/sendCod', '/auth/valAcct', '/user/new'];
 

  const { data } = useAuth();






  return (
    <>
      <LytComponent nombres={data?.nombres} rol={data?.rol} />
      <TstCmpnt></TstCmpnt>
    </>
  )

}
