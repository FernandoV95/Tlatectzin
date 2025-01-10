import { useEffect, useState } from "react";
import styles from "../../modules/NewPet.module.css";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { newDataPets } from "../../Api/PetsApi";
import Errors from "../../components/Errors";
import { PlusCircleOutlined } from "@ant-design/icons";
import { newPetForm } from "../../schema/Pets";


type NewDatePetsProps = {
    setIdPet: React.Dispatch<React.SetStateAction<string>>
    setIsValidIdPet: React.Dispatch<React.SetStateAction<boolean>>
}


const NewDataPet = ({ setIdPet, setIsValidIdPet }: NewDatePetsProps) => {

    const vacunas = [
        "Ninguna", "Rabia", "Moquillo", "Garrapatas", "Parasitos", "Pulgas", "Diarreas", "Neumonías neonatales"
    ];

    const opcionesTipo = [
        'Perro', 'Gato', 'Roedor', 'Pez', 'Aves', 'Reptiles', 'Ganado', 'Equinos', 'Porcino', 'Pokemones', 'Animal Fantastico'
    ];

    const [Vacunas, setVacunas] = useState<string[]>([]);

    const [formData, setFormData] = useState<{
        vacunasSeleccionadas: string[];
        otrasVacunas: string[];
    }>({
        vacunasSeleccionadas: [""],
        otrasVacunas: [""],
    });



    // Manejo de envío del formulario
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const vacunasSeleccionadas = checked
                ? [...prev.vacunasSeleccionadas, value]
                : prev.vacunasSeleccionadas.filter(
                    (vacuna) => vacuna !== value
                );
            return { ...prev, vacunasSeleccionadas };
        });
    };

    const handleOtraVacunaChange = (index: number, value: string) => {
        const nueva = [...formData.otrasVacunas];
        nueva[index] = value;
        setFormData({ ...formData, otrasVacunas: nueva });
        const nuevasVacunas = [...formData.vacunasSeleccionadas, ...nueva];
        setVacunas(nuevasVacunas);
    };

    // Agregar otro campo de "Otra vacuna"
    const agregarOtraVacuna = () => {
        setFormData({ ...formData, otrasVacunas: [...formData.otrasVacunas, ""] });
    };

    const initialValues: newPetForm = {
        alias: '',
        tipo: '',
        vacunas: [],
        shortDesc: '',
        longDesc: '',
    };

    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<newPetForm>({
        defaultValues: initialValues
    });

    useEffect(() => {
        // Filtra las vacunas y otras vacunas no vacías
        const aux = formData.vacunasSeleccionadas.filter(i => i !== "");
        const aux2 = formData.otrasVacunas.filter(v => v !== "");
        const vacunasFinales = [...aux, ...aux2];

        // Usa setValue para actualizar el valor de vacunas en react-hook-form
        setValue('vacunas', vacunasFinales);
    }, [formData.vacunasSeleccionadas, formData.otrasVacunas, setValue]);

    const { mutate } = useMutation({
        mutationFn: newDataPets,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            reset()
            toast.success(`Datos Almacenados 😊`);
            setIdPet(data)
            setIsValidIdPet(true)
        }
    });

    const onSub = (data: newPetForm) => {
        mutate(data);
    };

    return (
        <div className={`${styles.wrapper} w-11/12 m-auto`}>

            <form onSubmit={handleSubmit(onSub)} noValidate>
                <div className="grid grid-cols-2 justify-center">
                    {/*Derecho */}
                    <div className="border-2 border-cyan-500 rounded-lg">
                        <div className="grid grid-cols-2">
                            {/* Alias de la mascota */}
                            <div className="mb-1 w-11/12 m-auto">
                                <label className="w-full text-center">Alias</label>
                                <input
                                    type='text'
                                    placeholder="Nombre de la mascota"
                                    className="border-2 border-cyan-500 rounded-lg p-2 text-lg w-full"
                                    {...register('alias', { required: '¡Necesitamos el nombre!' })}
                                />
                                {errors.alias && <Errors>¡Tu alias es obligatorio!</Errors>}
                            </div>

                            {/* Tipo de animal */}
                            <div className="mb-1 w-11/12 m-auto">
                                <label className="w-full text-center">Tipo</label>
                                <select
                                    className="border-2 border-cyan-500 rounded-lg p-2 text-lg bg-transparent w-full"
                                    {...register('tipo', { required: '¡Selecciona un tipo!' })}
                                >
                                    <option value="" disabled>Selecciona un tipo</option>
                                    {opcionesTipo.map((tipo) => (
                                        <option key={tipo} className="text-black" value={tipo.toLowerCase()}>{tipo}</option>
                                    ))}
                                </select>
                                {errors.tipo && <Errors>{errors.tipo.message}</Errors>}
                            </div>
                        </div>

                        {/* Descripcion corta */}
                        <div className="mb-1 w-11/12 m-auto">
                            <label className="w-full text-center">Descripción Corta:</label>
                            <input
                                placeholder="Danos una descripcion breve"
                                className="text-black border-2 border-cyan-500 rounded-lg p-2 text-lg w-full"
                                type="text"
                                {...register('shortDesc', { required: '¡No hay descripcion corta!' })}
                            />
                            {errors.shortDesc && <Errors>{errors.shortDesc.message}</Errors>}
                        </div>

                        {/* Descripcion Larga */}
                        <div className="mb-1 w-11/12 m-auto">
                            <label className="w-full text-center">Descripción Larga</label>
                            <textarea
                                className="border-2 border-cyan-500 rounded-lg p-2 text-lg w-full text-black"
                                placeholder="Danos una descripion mas precisa"
                                rows={5}
                                {...register('longDesc', { required: '¡No hay descripcion larga!' })}
                            />
                            {errors.longDesc && <Errors>{errors.longDesc.message}</Errors>}
                        </div>
                    </div>

                    {/*Izquierdo */}
                    <div>
                        {/* Checkboxes de Vacunas */}
                        <div className="mt-1 mb-1 w-11/12 m-auto p-2 border-2 border-cyan-500 rounded-lg">
                            <label className="w-full text-center">Vacunas</label>

                            <div className="grid grid-cols-2 gap-2">
                                {vacunas.map((vacuna, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input
                                            id={`vacuna-${i}`}
                                            type="checkbox"
                                            className="size-4"
                                            value={vacuna}
                                            {...register('vacunas', {
                                                validate: (vacunas) => {
                                                    if (vacunas.length === 0) {
                                                        return "¡Deben saber si esta vacunado o no!";
                                                    }
                                                }
                                            })}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor={`vacuna-${i}`}>{vacuna}</label>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Campo para "Otras" */}
                        <div className="mt-1 mb-1 w-11/12 m-auto p-2 border-2 border-cyan-500 rounded-lg">
                            <div className="flex w-full">
                                <label className="flex w-full items-center space-x-2">Otras vacunas</label>
                                <button
                                    type="button"
                                    className="text-lg font-semibold hover:scale-110 transition-all duration-300"
                                    onClick={agregarOtraVacuna}
                                >
                                    <PlusCircleOutlined style={{ fontSize: "2rem" }} />
                                </button>
                            </div>

                            {formData.otrasVacunas.map((vacuna, index) => (
                                <div key={index} className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        value={vacuna}
                                        onChange={(e) => handleOtraVacunaChange(index, e.target.value)}
                                        className="w-full border-2 border-cyan-500 rounded-lg p-2 text-lg mb-1"
                                        placeholder="Ingresa otra vacuna"
                                    />
                                </div>
                            ))}

                            {errors.vacunas && (
                                <Errors>{errors.vacunas.message}</Errors>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center m-3">
                    <input
                        type="submit"
                        value="Enviar"
                        className={`${styles.sub} w-1/6 text-2xl text-black font-bold`}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewDataPet;
