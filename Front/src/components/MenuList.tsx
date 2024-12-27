import { Menu } from "antd"
import { HomeOutlined, BaiduOutlined, FormOutlined, UsergroupAddOutlined, UserAddOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

type darkThemeProps = {
    darkTheme: boolean
}


function MenuList({ darkTheme }: darkThemeProps) {

    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const onOpenChange = (keys: string[]) => { 
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []); //Abre y cierra
    };


    const items = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <NavLink to="/" className="no-underline font-silkscreen text-white">Inicio</NavLink>,
        },
        {
            key: 'pets',
            icon: <BaiduOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen text-white">Mascotas</NavLink>,
        },
        {
            key: 'meeting',
            icon: <FormOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen text-white">Citas</NavLink>,
            children: [
                {
                    key: 'agenda',
                    label: <NavLink to="/mtng/new" className="no-underline font-silkscreen">Agendar</NavLink>
                },
                {
                    key: 'collection',
                    label: <NavLink to="/mtng/show" className="no-underline font-silkscreen">Mis citas</NavLink>
                }
            ]
        },
        {
            key: 'profiles',
            icon: <UsergroupAddOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen text-white">Perfiles</NavLink>,
            children: [
                {
                    key: 'users',
                    label: <NavLink to={'/admind/AllUsers'} className="no-underline font-silkscreen">Usuarios</NavLink>
                },
                {
                    key: 'pets2',
                    label: <NavLink to="" className="no-underline font-silkscreen">Mascotas</NavLink>
                }, 
                {
                    key: 'meetings',
                    label: <NavLink to="" className="no-underline font-silkscreen">Citas</NavLink>
                }
            ]
        },
        {
            key: 'we',
            icon: <UserAddOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen text-white">Nosotros</NavLink>,
        },
    ];

    return (
        <Menu
            theme={darkTheme ? 'dark' : 'light'}
            mode="inline"
            className="menu-bar"
            items={items}
            openKeys={openKeys} // Controla qué submenú está abierto
            onOpenChange={onOpenChange} // Controla el cambio de submenú abierto
        />
    );
}

export default MenuList