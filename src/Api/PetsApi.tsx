
import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { AllPetImgSh, AllPetSh, idForm, idImgPetForm, newPetForm, updtDataPetForm } from "../schema/Pets"


// Almacena los datos de la mascota
export async function newDataPets(data: newPetForm) {
    try {
        const { data: responseData } = await api.post('/admind/pet/new', data);
        return responseData;
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error);
    }
}

// Almacena las imagenes de las mascotas
export async function newImgPets({ imgData, idPet }: { imgData: File[], idPet: idForm['_id'] }) {
    try {
        // Crear un objeto FormData para manejar la subida de archivos
        const formData = new FormData();

        // Agregar los archivos a FormData (suponiendo que imgData es un array de archivos)
        imgData.forEach((file) => {
            formData.append('imagenes', file); // 'imagenes' es el nombre del campo de archivo en el backend
        });

        // Realizar la solicitud POST enviando el FormData
        const { data } = await api.post(`/admind/pet/add-img/${idPet}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Establecer el tipo de contenido como multipart/form-data
            },
        });

        return data; // Si todo va bien, devuelve la respuesta
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}


//Mostrar los datos de la mascota
export async function shwPets() {
    try {
        const { data } = await api('/pets/show')
        const response = AllPetSh.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Mostrar las datos de la mascota por ID
export async function shwPetsID(idPet: idForm['_id']) {
    try {
        const { data } = await api(`/pets/show/${idPet}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Mostrar los datos de la mascota disponibles
export async function catalog() {
    try {
        const { data } = await api('/pets/catalog')
        const response = AllPetSh.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Actualizar datos de la mascota
export async function updtDataPetID({ formData, idPet }: { formData: updtDataPetForm, idPet: idForm['_id'] }) {
    try {
        const { data } = await api.put(`admind/pet/data/updt/${idPet}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Mostrar iamgenes de una sola mascota por su Id
export async function showPetImgsId(idPet: idForm['_id']) {
    try {
        const { data } = await api(`/pets/show/imgs/${idPet}`)
        const response = AllPetImgSh.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Borrar imagenes de una mascota
export async function deleteImgPetById({ idImg, idPet }: { idImg: idImgPetForm['_id'], idPet: idForm['_id'] }) {
    try { 
        const { data } = await api.delete(`/admind/pet/${idPet}/imgs/delete/${idImg}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}