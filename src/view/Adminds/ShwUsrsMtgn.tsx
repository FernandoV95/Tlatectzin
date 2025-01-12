
import { useQuery} from "@tanstack/react-query";
import { AiOutlineLike } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";
import { IoMdStopwatch } from "react-icons/io";
import { MdLocalHospital } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import styles from "../../modules/showCitas.module.css"

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { HighlightTwoTone } from "@ant-design/icons";
import { useState } from "react";
import SmplMdl from "../../components/modals/SmplMdl";
import { getMtng } from "../../Api/AdmindApi";  
import AsigVeter from "../../components/meeting/AsigVeter";


const ShowUsrsMtgn = () => {


    const [abrir, setAbrir] = useState(false);
    const [idCita, setIdCita] = useState('')

    //Va a Mostrar los datos
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getMeetings'],
        queryFn: getMtng,
        enabled: true
    });



    if (isLoading)
        return (
            <div>
                <p className="text-white">Cargando....</p>
            </div>
        )

    if (isError)
        return (
            <p>Hubo problemas</p>
        )


    const IconMotive = (motivo: string): JSX.Element => {
        switch (motivo) {
            case 'adoptar':
                return <GiDogHouse className=" size-5" title="Adoptar" />;
            case 'dar en adopcion':
                return <FaHandHoldingHeart className="size-5" title="Dar en adopcion" />;
            case 'veterinario':
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
        _id: string;
        Ncita: number;
        usuario: string;
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
            title: <div style={{ textAlign: 'center' }}>Usuario</div>,
            dataIndex: 'usuario', key: 'usuario', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Veterinario</div>,
            dataIndex: 'veterinario', key: 'veterinario', align: 'center'
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
            showSorterTooltip: { target: 'full-header' },
            filters: [
                { text: 'Cancelada', value: 'Cancelada' },
                { text: 'Pendiente', value: 'Pendiente' },
                { text: 'En proceso', value: 'En proceso' },
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,

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
            showSorterTooltip: { target: 'full-header' },
            filters: [
                { text: 'Dar en adopcion', value: 'dar en adopcion' },
                { text: 'Veterinario', value: 'veterinario' },
                { text: 'Adoptar', value: 'adoptar' },
            ],
            onFilter: (value, record) => record.motivo.indexOf(value as string) === 0,
            key: 'iconMotivo', render: (icon) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </div>)
        },
        {
            title: <div style={{ textAlign: 'center' }}>Asignar</div>,
            dataIndex: '',
            key: 'x',
            render: (record) => (
                <div
                    className="flex justify-center items-center text-xl cursor-pointer hover:scale-110 transition-all duration-300"
                    onClick={() => {
                        setAbrir(!abrir);
                        setIdCita(record._id)
                    }}
                >
                    <HighlightTwoTone />
                </div>
            )
        }
    ];

    const Citas = data?.map((m) => ({
        key: m._id,
        _id: m._id,
        Ncita: m.N_cita,
        usuario: m.usuario.nombres,
        veterinario: m.veterinario?.nombres ? m.veterinario.nombres : "pendiente..."  ,
        fecha: m.fecha,
        hora: m.hora,
        status: m.status,
        iconStatus: IconStatus(m.status),
        alias: m.alias,
        iconMotivo: IconMotive(m.motivo),
        motivo: m.motivo,
        comentario: m.comentarios,
    })) || [];

    console.log(data)
 
    if (data) return (
        <>
            <div className={`${styles.cajita} pt-8`}>
                <div className=' bg-transparent backdrop-blur-[10rem] w-11/12 m-auto
                shadow-[0 0 90px rgba(0, 0, 0,.2)] pt-2'>
                    <h1 className="text-white text-center font-pacifico">Citas agendadas</h1>


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
                        </>
                    )}
                </div>
            </div >

            <SmplMdl open={abrir} setVisible={setAbrir}>
                <AsigVeter idCita={idCita} setVisible={setAbrir}/>
            </SmplMdl>
        </>
    );
};

export default ShowUsrsMtgn