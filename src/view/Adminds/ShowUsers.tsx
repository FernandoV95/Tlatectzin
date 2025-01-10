import { useQuery } from "@tanstack/react-query";
import { shwUsrs } from "../../Api/AdmindApi";
import { CheckOutlined, CloseOutlined, HighlightTwoTone } from "@ant-design/icons";
import { Button } from 'antd';
import SmplMdl from "../../components/modals/SmplMdl";
import { useState } from "react";
import SendEmailVeter from "./SendEmailVeter";
import UpdtUser from "./UpdtUser";
import Table, { ColumnsType } from "antd/es/table";
import styles from "../../modules/ShowUser.module.css";

function ShowUsers() {
    const [OpenEmailRegister, setOpenEmailRegister] = useState(false);
    const [OpenEditUser, setOpenEditUser] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['usuarios'],
        queryFn: shwUsrs,
        enabled: true,
        retry: 2,
    });

    // Filtrar los datos en función del filtro de búsqueda
    const datosFiltrados = data && data.filter((i) =>
        i.email.toLowerCase().includes(filtroTipo.toLowerCase()) ||
        i.cedula?.toLowerCase().includes(filtroTipo.toLowerCase()) 
    ) || [];

    // Manejo del cambio en el campo de búsqueda
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroTipo(e.target.value);
    };

    // Función para mostrar el ícono de "confirmado"
    const IconConfirmed = (confirmed: boolean): JSX.Element => {
        return confirmed ? <CheckOutlined className="size-5" title="Pendiente" /> : <CloseOutlined className="size-5" title="Pendiente" />;
    };

    interface DataType {
        key: React.Key;
        _id: string;
        nombres: string;
        apPat: string;
        apMat: string;
        tel: string;
        email: string;
        rol: string;
        universidad: string | undefined;
        cedula: string | undefined;
        confirmed: boolean;
        iconConfirmed: JSX.Element;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: <div style={{ textAlign: 'center' }}>Aut</div>,
            align: 'center',
            dataIndex: 'iconConfirmed',
            key: 'iconConfirmed',
            render: (icon) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </div>)
        },
        {
            title: <div style={{ textAlign: 'center' }}>Rol</div>,
            dataIndex: 'rol', key: 'rol', align: 'center',
            showSorterTooltip: { target: 'full-header' },
            filters: [
                { text: 'Administrador', value: 'administrador' },
                { text: 'Veterinario', value: 'veterinario' },
                { text: 'Usuario', value: 'usuario' },
            ],
            onFilter: (value, record) => record.rol.indexOf(value as string) === 0,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Nombre(s)</div>,
            dataIndex: 'nombres', key: 'nombres', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>ApPat</div>,
            dataIndex: 'apPat', key: 'apPat', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>ApMat</div>,
            dataIndex: 'apMat', key: 'apMat', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Telefono</div>,
            dataIndex: 'tel', key: 'tel', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Universidad</div>,
            dataIndex: 'universidad', key: 'universidad', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Cedula</div>,
            dataIndex: 'cedula', key: 'cedula', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Editar</div>,
            dataIndex: '',
            key: 'x',
            render: (record) => (
                <div
                    className="flex justify-center items-center text-xl cursor-pointer hover:scale-110 transition-all duration-300"
                    onClick={() => {
                        setOpenEditUser(!OpenEditUser);
                        setIdUser(record._id);
                    }}
                >
                    <HighlightTwoTone />
                </div>
            )
        },
    ];

    const Usuarios = datosFiltrados.map((u) => ({
        key: u._id,
        _id: u._id,
        nombres: u.nombres,
        apPat: u.apPat,
        apMat: u.apMat,
        tel: u.tel,
        email: u.email,
        rol: u.rol,
        universidad: u.universidad,
        cedula: u.cedula,
        confirmed: u.confirmed,
        iconConfirmed: IconConfirmed(u.confirmed),
    })) || [];

    if (isLoading) return <p>Cargando....</p>;
    if (isError) return <p>Hubo problemas con el servidor</p>;

    return (
        <>
            <div className={` ${styles.cajita} pt-8 relative z-10`}>
                <div className="w-11/12 flex justify-end mb-4 text-white absolute z-20 my-3">
                    <Button type="primary" onClick={() => setOpenEmailRegister(!OpenEmailRegister)}>
                        <span className="text-xl py-2">Nuevo usuario</span>
                    </Button>
                </div>

                <div className="w-11/12 flex text-white absolute my-3 left-20 z-20">
                    {/* Campo de búsqueda */}
                    <input
                        type="text"
                        placeholder="Busca por correo o cédula "
                        value={filtroTipo}
                        onChange={handleInputChange}
                        className="w-1/4 p-1 border border-cyan-600 rounded-md"
                    />
                </div>

                <div className='bg-transparent backdrop-blur-[10rem] w-11/12 m-auto shadow-[0 0 90px rgba(0, 0, 0,.2)] pt-2'>
                    <h1 className="text-white text-center font-pacifico">Usuarios Registrados</h1>

                    {Usuarios.length > 0 ? (
                        <Table<DataType>
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <>
                                        <p className="text-lg text-black font-bold mr-2">Email: &nbsp;
                                            <span className="text-black font-normal">{record.email}</span>
                                        </p>
                                    </>
                                ),
                                rowExpandable: (record) => record.confirmed !== false,
                            }}
                            dataSource={Usuarios}
                        />
                    ) : (
                        <Table<DataType>
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.rol}</p>,
                                rowExpandable: (record) => record.confirmed !== false,
                            }}
                            dataSource={[]}
                        />
                    )}
                </div>
            </div>

            {/* Modal para registro de usuario */}
            <SmplMdl
                open={OpenEmailRegister}
                setVisible={setOpenEmailRegister}
                children={<SendEmailVeter setVisible={setOpenEmailRegister} />}
            />

            {/* Modal para editar usuario */}
            <SmplMdl
                open={OpenEditUser}
                setVisible={setOpenEditUser}
                children={<UpdtUser idUser={idUser} setVisible={setOpenEditUser} />}
            />
        </>
    );
}

export default ShowUsers;
