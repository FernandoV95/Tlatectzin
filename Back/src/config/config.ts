import { CorsOptions } from "cors";
 
export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_URL];
 
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); //Permite la conexion
    } else {
      callback(new Error("Error al conectarnos al servidor"));
    }
  },
};
