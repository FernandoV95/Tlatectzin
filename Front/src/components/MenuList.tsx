import { Menu } from "antd"
import { HomeOutlined, BaiduOutlined, FormOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

type darkThemeProps = {
    darkTheme: boolean
}


function MenuList({ darkTheme }: darkThemeProps) {
    const items = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <NavLink to="/" className="no-underline font-silkscreen">Inicio</NavLink>,
        },
        {
            key: 'pets',
            icon: <BaiduOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen">Mascotas</NavLink>,
        },
        {
            key: 'agenda',
            icon: <FormOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen">Agendar</NavLink>,
        },
        {
            key: 'we',
            icon: <UsergroupAddOutlined />,
            label: <NavLink to="" className="no-underline font-silkscreen">Nosotros</NavLink>,
        },
    ];

    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar" items={items} />
    );
}

export default MenuList