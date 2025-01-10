import { Router } from "express"; 
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";
import { meetingControllers } from "../controllers/MettingController";
import { Authenticate } from "../middleware/Auth";


const MttngRt= Router() 
//-----------------Rutas para Agendar Cita -----------------

MttngRt.use(Authenticate)

//Crear una nueva cita
MttngRt.post('/new',
    //Authenticate, 
    InputErrors,
    meetingControllers.newMeeting
)

//Muestrar mis reuniones agendadas
MttngRt.get('/show', 
    //Authenticate,
    InputErrors,
    meetingControllers.getAllMetting
)

//Busca la reunion por su Id
MttngRt.get('/show/:idM', 
    //Authenticate,
    InputErrors,
    meetingControllers.getByMttng
)

//Actualiza los datos de la reunion
MttngRt.patch('/update/:idM',
    //Authenticate,
    InputErrors,
    meetingControllers.updateMttng
)


//Cancela la reunion
MttngRt.patch('/cancel/:idM',
    //Authenticate,
    InputErrors,
    meetingControllers.cancelledMttng
)

export default MttngRt