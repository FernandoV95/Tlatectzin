import express from "express"   
import dotenv from "dotenv"
import { conecctDB } from "./config/db"
import { corsConfig } from "./config/config"
import cors from 'cors'

import MttngRt from "./routers/MttngRt"
import PetsRt  from "./routers/PetsRt"
import AuthRt from "./routers/AuthRt"
import AdmindRt from "./routers/AdmindRt"

dotenv.config()
conecctDB();
 
const server = express()
server.use(cors(corsConfig))

//Leer en conosla...Recuerda Borrarlo en testing
server.use(express.json())

//Rutas
//Para crear usuarios
server.use('/api/user',AuthRt);
//Para agendar reuniones
server.use('/api/mtng',MttngRt)
//Para agregar mascotas
server.use('/api/pets',PetsRt)
//Para la administracion
server.use('/api/admind',AdmindRt)




export default server



