import express from "express"   
import dotenv from "dotenv"
import { conecctDB } from "./config/db"
import { corsConfig } from "./config/config"
import cors from 'cors'

import MttngRt from "./routers/MttngRt"
import PetsRt  from "./routers/PetsRt"
import AuthRt from "./routers/AuthRt"
import AdmindRt from "./routers/AdmindRt"
import UserRt from "./routers/UserRt"
import morgan from "morgan"
import VetRt from "./routers/Vetery"

dotenv.config()
conecctDB();
 
const server = express()
server.use(cors(corsConfig))

//morgan
//server.use(morgan('dev'))

//Leer datos del formulario en consola
server.use(express.json())

//Rutas
//Para autenticar cuentas
server.use('/api/auth',AuthRt);

//Para crear usuarios
server.use('/api/user',UserRt);

//Para la administracion
server.use('/api/admind',AdmindRt)

//Para agendar reuniones
server.use('/api/mtng',MttngRt)

//Para veterinarios
server.use('/api/vet',VetRt)

//Para agregar mascotas
server.use('/api/pets',PetsRt)




export default server



