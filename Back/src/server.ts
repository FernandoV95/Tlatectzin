import express from "express"   
import dotenv from "dotenv"
import { conecctDB } from "./config/db"
import { corsConfig } from "./config/config"
import cors from 'cors'
import routerUser from "./routers/RutasUsers" 
import routerMetting from "./routers/RutasMettings"
import routerPets from "./routers/RutasPets"
import routerVet from "./routers/RutasVet"

dotenv.config()
conecctDB();
 
const server = express()
server.use(cors(corsConfig))

//Leer en conosla...Recuerda Borrarlo en testing
server.use(express.json())

//Rutas

//Para los crear-autenticar usuarios
server.use('/api/auth',routerUser);

//Para agendar reuniones
server.use('/api/meeting',routerMetting)

//Para agendar mascotas
server.use('/api/pets',routerPets)

//Para alos veterinarios
server.use('/api/veterinary',routerVet)


export default server
