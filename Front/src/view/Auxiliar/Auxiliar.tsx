
import { useQuery } from "@tanstack/react-query";
import { shwMtng } from "../../Api/MeetingApi";

import { AiOutlineLike } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";
import { IoMdStopwatch } from "react-icons/io";
import { MdLocalHospital } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import styles from "../../modules/showCitas.module.css"

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, NavLink } from "react-router-dom";
import { CloseCircleTwoTone, HighlightTwoTone } from "@ant-design/icons";


function Auxiliar() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['Meetings'],
        queryFn: shwMtng,
        enabled: true
    });

    if (isLoading)
        return (
            <p>Cargando....</p>
        )

    if (isError)
        return (
            <p>Hubo problemas</p>
        )


    const IconMotive = (motivo: string): JSX.Element => {
        switch (motivo) {
            case 'Adoptar':
                return <GiDogHouse className=" size-5" title="Adoptar" />;
            case 'Dar en Adopción':
                return <FaHandHoldingHeart className="size-5" title="Dar en adopcion" />;
            case 'Veterinario':
                return <MdLocalHospital className="size-5" title="Veterinario" />;
            default:
                return <span />;
        }
    };

    const IconStatus = (status: string): JSX.Element => {
        switch (status) {
            case 'Pendiente':
                return <IoMdStopwatch className="size-5" title="Pendiente" />;
            case 'Cancelada':
                return <TiCancel className="size-5" title="Cancelada" />;
            case 'Concluida':
                return <AiOutlineLike className="size-5" title="Concluida" />;
            default:
                return <span />;
        }
    };



    ///////////////////////////////////////////////////////////////
    interface DataType {
        key: React.Key;
        Ncita: number;
        fecha: string;
        hora: string;
        status: string;
        iconStatus: JSX.Element;
        alias: string;
        comentario: string;
        iconMotivo: JSX.Element;
        motivo: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: <div style={{ textAlign: 'center' }}>Ncita</div>,
            dataIndex: 'Ncita', key: 'Ncita', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Fecha</div>,
            dataIndex: 'fecha', key: 'fecha', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hora</div>,
            dataIndex: 'hora', key: 'hora', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Status</div>,
            align: 'center',
            dataIndex: 'iconStatus',
            key: 'iconStatus',
            render: (icon) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </div>)
        },
        {
            title: <div style={{ textAlign: 'center' }}>Alias</div>,
            dataIndex: 'alias', key: 'alias', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Motivo</div>,
            align: 'center',
            dataIndex: 'iconMotivo',
            key: 'iconMotivo', render: (icon) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </div>)
        },
        {
            title: <div style={{ textAlign: 'center' }}>Editar</div>,
            dataIndex: '',
            key: 'x',
            render: () => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                    <Link to="" className=" cursor-pointer hover:scale-110 transition-all duration-300">
                        <HighlightTwoTone />
                    </Link>
                </div>
            )
        }, {
            title: <div style={{ textAlign: 'center' }}>Eliminar</div>,
            dataIndex: '',
            key: 'x',
            render: () => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                    <Link to="" className=" cursor-pointer hover:scale-110 transition-all duration-300">
                        <CloseCircleTwoTone/>
                    </Link>
                </div >
            )
        },
    ];

    const Citas = data?.map((m) => ({
        key: m._id,
        Ncita: m.N_cita,
        fecha: m.fecha,
        hora: m.hora,
        status: m.status,
        iconStatus: IconStatus(m.status),
        alias: m.alias,
        iconMotivo: IconMotive(m.motivo),
        motivo: m.motivo,
        comentario: m.comentarios,
    })) || [];



    if (data) return (
        <>
            <div className={`${styles.cajita} pt-8`}>
                <div className=' bg-transparent backdrop-blur-[10rem] w-11/12 m-auto
                shadow-[0 0 90px rgba(0, 0, 0,.2)] pt-2'>
                    <h1 className="text-white text-center font-pacifico">Bienvenido Kim</h1>


                    {Citas.length > 0 ? (
                        <Table<DataType>
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.comentario}</p>,
                                rowExpandable: (record) => record.status !== 'Cancelada',
                            }}
                            dataSource={Citas}
                        />
                    ) : (
                        <>
                            <Table<DataType>
                                columns={columns}
                                expandable={{
                                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.comentario}</p>,
                                    rowExpandable: (record) => record.status !== 'Cancelada',
                                }}
                                dataSource={[]}
                            />
                            <div className="w-4/5 m-auto text-white text-lg flex justify-center pt-4">
                                <p>No tienes citas agendadas &nbsp;&nbsp;</p>
                                <Link
                                    to="/mtng/new"
                                    className="no-underline text-white transform hover:scale-110 transition-transform duration-200"
                                >
                                    ¿Quieres agendar?
                                </Link>
                            </div>
                        </>
                    )}


                </div>

            </div >
        </>
    );
}

export default Auxiliar;
