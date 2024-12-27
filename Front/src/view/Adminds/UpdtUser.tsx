import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsrId, updtUsrId } from "../../Api/AdmindApi";
import { useForm } from "react-hook-form";
import { UpdtUserForm } from "../../schema/Users";
import { useEffect } from "react";
import { validateDate } from "../../util/Valid";
import Errors from "../../components/Errors";
import { toast } from "react-toastify";

type UpdtUserProps = {
    idUser: string;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdtUser({ idUser, setVisible }: UpdtUserProps) {


    // Va a buscar al usuario por Id
    const { data, isLoading, isError} = useQuery({
        queryKey: ['usuario', idUser], // Usando el idUser directamente como string
        queryFn: () => getUsrId(idUser),
        retry: 3, 
    });

    // Va actualizar los datos del usuario
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updtUsrId,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['usuarios']})
            queryClient.invalidateQueries({queryKey:['usuario', idUser]});
            setVisible(false);
        }
    });
    

    //---------------> Controladores para el FORM <---------------
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdtUserForm>({
        defaultValues: {
            _id: '',
            nombres: '',
            apPat: '',
            apMat: '',
            tel: '',
            email: '',
            universidad: '',
            cedula: '',
            rol: '',
        }
    });

    //---------------> useEffect para actualizar datos cuando 'data' cambie <---------------
    useEffect(() => {
        if (data) {
            setValue("_id", data._id!);
            setValue("nombres", data.nombres || "");
            setValue("apPat", data.apPat || "");
            setValue("apMat", data.apMat || "");
            setValue("tel", data.tel || "");
            setValue("email", data.email || "");
            setValue("universidad", data.universidad || "");
            setValue("cedula", data.cedula || "");
            setValue("rol", data.rol || "");
        }
    }, [data, setValue]);

    const onSub = (formData: UpdtUserForm) => {
        const datos = {
            formData, idUser
        };
        mutate(datos);
    };

    if (isLoading)
        return (
            <div className={``}>
                <p>Cargando....</p>
            </div>
        );

    if (isError)
        return (
            <p>Hubo problemas con el servidor</p>
        );

    if (data) return (
        <>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <form onSubmit={handleSubmit(onSub)} noValidate>
                    <table className="min-w-full text-left table-auto">
                        <thead className="bg-green-500 text-white">
                            <tr>
                                <th className="px-10 py-3 text-sm font-semibold">Nombres</th>
                                <th className="px-6 py-3 text-sm font-semibold">apPat</th>
                                <th className="px-6 py-3 text-sm font-semibold">apMat</th>
                                <th className="px-24 py-3 text-sm font-semibold">Correo</th>
                                <th className="px-8 py-3 text-sm font-semibold">Telefono</th>
                                <th className="px-8 py-3 text-sm font-semibold">Universidad</th>
                                <th className="px-8 py-3 text-sm font-semibold">Cedula</th>
                                <th className="px-16 py-3 text-sm font-semibold">Rol</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr key={data._id}>
                                <td className=" py-4 border-b">{data.nombres}</td>
                                <td className="px-6 py-4 border-b">{data.apPat}</td>
                                <td className="px-6 py-4 border-b">{data.apMat}</td>
                                <td className="px-6 py-4 border-b">{data.email}</td>
                                <td className="py-4 border-b ">
                                    <input
                                        type="text"
                                        className="w-full border-1 border-cyan-500 rounded-lg p-1"
                                        {...register('tel', {
                                            required: 'Es necesario un telefono',
                                            validate: validateDate
                                        })}
                                    />
                                    {errors.tel && <Errors>{errors.tel.message}</Errors>}
                                </td>
                                
                                <td className="py-4 border-b " >
                                    <input
                                        type="text"
                                        className="w-full border-1 border-cyan-500 rounded-lg p-1"
                                        {...register('universidad', { required: false })}
                                    />
                                </td>

                                <td className="py-4 border-b " >
                                    <input
                                        type="text"
                                        className="w-full border-1 border-cyan-500 rounded-lg p-1"
                                        {...register('cedula', { required: false })}
                                    />
                                </td>

                                <td className="py-4 border-b">
                                    <select
                                        className="w-full border-2 border-cyan-500 p-1 rounded-lg"
                                        {...register('rol', { required: 'Cual es su rol' })}
                                    >
                                        <option value="usuario">Usuario</option>
                                        <option value="veterinario">Veterinario</option>
                                        <option value="administrador">Administrador</option>
                                    </select>
                                    {errors.rol && <Errors>{errors.rol.message}</Errors>}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-end mt-4">
                        <input
                            type="submit"
                            value="¡Listo!"
                            className="w-1/3 border-cyan-500 p-1 rounded-lg text-xl text-black font-bold"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdtUser;
