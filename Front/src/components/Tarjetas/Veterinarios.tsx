
type props = {
    nombres: string
    horario: string
    descripcion: string
    imagen: string
}

function Veterinarios({ nombres, horario, descripcion, imagen }: props) {
    return (
        <>
            <div className=" grid grid-cols-2 gap-3">
                <div className=" w-auto ">
                    <img
                        src={imagen}
                        alt={nombres}
                        className={`w-full`}
                    />
                </div>
                <div>
                    <h2>{nombres}</h2>
                    <p>
                        <strong>Horario:</strong> {horario}
                    </p>
                    <p>
                        <strong>Descripción:</strong> {descripcion}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Veterinarios

