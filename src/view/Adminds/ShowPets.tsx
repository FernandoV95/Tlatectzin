import { useQuery } from "@tanstack/react-query";
import { shwPets } from "../../Api/PetsApi";
import Table, { ColumnsType } from "antd/es/table";
import { HighlightTwoTone } from "@ant-design/icons";
import { useState } from "react";
import styles from "../../modules/ShowPets.module.css"
import { Link } from "react-router-dom";
import SmplMdl from "../../components/modals/SmplMdl";
import UpdtPet from "../Pets/UpdtPet";
import UpdtImgPet from "../Pets/UpdtImgPet";

export default function ShowPets() {
    const [abrir, setAbrir] = useState(false);
    const [idPet, setIdPet] = useState('');
    const [cambiarVentana, setCambiarVentana] = useState(false)

    const tipos = [
        'Perro', 'Gato', 'Roedor', 'Pez', 'Aves', 'Reptiles', 'Ganado', 'Equinos', 'Porcino', 'Pokemones', 'Animal Fantastico']


    const { data, isLoading, isError } = useQuery({
        queryKey: ['Pets'],
        queryFn: shwPets,
        enabled: true
    });

    // Manejo de estados de carga y error
    if (isLoading) {
        return <div><p>Cargando...</p></div>;
    }

    if (isError) {
        return <div><p>Hubo problemas con el servidor</p></div>;
    }

    // Interfaz de datos para la tabla
    interface DataType {
        key: React.Key;
        _id: string;
        status: string;
        alias: string;
        tipo: string;
        shortDesc: string;
        longDesc: string;
        vacunas: string[];
        imagenes: { secure_url: string }[];  // Imágenes como array de objetos con secure_url
    }

    // Columnas de la tabla
    const columns: ColumnsType<DataType> = [
        {
            title: <div style={{ textAlign: 'center' }}>Estatus</div>,
            dataIndex: 'status', key: 'status', align: 'center',
            filters: [
                {
                    text: 'Pendiente',
                    value: 'pendiente',
                },
                {
                    text: 'Adoptado',
                    value: 'adoptado',
                },
                {
                    text: 'Pereció',
                    value: 'perecio',
                }],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Alias</div>,
            dataIndex: 'alias', key: 'alias', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Tipo</div>,
            dataIndex: 'tipo', key: 'tipo', align: 'center',
            filters: tipos.map(i => ({
                text: i,
                value: i.toLowerCase()
            })),
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Desc. Corta</div>,
            dataIndex: 'shortDesc', key: 'shortDesc', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Desc. Larga</div>,
            dataIndex: 'longDesc', key: 'longDesc', align: 'center'
        },
        {
            title: <div style={{ textAlign: 'center' }}>Imagen</div>,
            dataIndex: 'imagenes', key: 'imagenes', align: 'center',
            render: (imagenes: { secure_url: string }[], record: DataType) => (
                <div className="w-24 h-24 m-auto overflow-hidden">
                    {imagenes.length > 0 ? (
                        <img className="w-full h-full object-contain" src={imagenes[0].secure_url} title={record.alias} alt={record.alias} />
                    ) : (
                        <p>No hay imágenes</p>
                    )}
                </div>

            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Editar</div>,
            dataIndex: '',
            key: 'x',
            render: (record) => (
                <div
                    className="flex justify-center items-center text-xl cursor-pointer hover:scale-110 transition-all duration-300"
                    onClick={() => {
                        setAbrir(!abrir);
                        setIdPet(record._id);
                    }}
                >
                    <HighlightTwoTone />
                </div>
            )
        }
    ];

    // Mapeo de datos para la tabla
    const Mascotas = data?.map((p) => ({
        key: p._id,
        _id: p._id,
        status: p.status,
        alias: p.alias,
        tipo: p.tipo,
        shortDesc: p.shortDesc,
        longDesc: p.longDesc,
        vacunas: p.vacunas,
        imagenes: p.imagenes,  // Renombrado a 'imagenes' para coincidir con la columna
    })) || [];

    // Renderizado de la tabla y detalles de la mascota
    if (data) {
        return (
            <>
                <div className={`${styles.cajita} pt-8 relative z-10`} >
                    <div className="w-11/12 flex justify-end mb-4 text-white absolute z-20 my-2 ">
                        <Link to="/admind/pets/new"
                            className=" no-underline text-xl bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Nueva Mascota
                        </Link>
                    </div>
                    <div className=' bg-transparent backdrop-blur-[10rem] w-11/12 m-auto
                shadow-[0 0 90px rgba(0, 0, 0,.2)] pt-2'>

                        <h1 className="text-white text-center font-pacifico">
                            Estas son nuestras mascotas
                        </h1>


                        {Mascotas.length > 0 ? (
                            <Table<DataType>
                                columns={columns}
                                expandable={{
                                    expandedRowRender: (record) => record.vacunas.join(', '),
                                    rowExpandable: (record) => record.status !== 'adoptado' && record.status !== 'perecio',
                                }}
                                dataSource={Mascotas}
                            />
                        ) : (
                            <>
                                <Table<DataType>
                                    columns={columns}
                                    expandable={{
                                        expandedRowRender: (record) => record.vacunas.join(', '),
                                        rowExpandable: (record) => record.status !== 'adoptado',
                                    }}
                                    dataSource={[]}
                                />
                            </>
                        )}
                    </div>
                </div >

                <SmplMdl
                    open={abrir}
                    setVisible={setAbrir}
                    children={
                        !cambiarVentana ? (
                            <UpdtPet idPet={idPet} setCambiarVentana={setCambiarVentana} />
                        ) : (
                            <UpdtImgPet idPet={idPet} setVisible={setAbrir} setCambiarVentana={setCambiarVentana} />
                        )
                    }

                />
            </>
        );
    }
}
