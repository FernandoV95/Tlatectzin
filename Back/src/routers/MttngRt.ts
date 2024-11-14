import { Router } from "express"; 
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";
import { meetingControllers } from "../controllers/MettingController";
import { Authenticate } from "../middleware/Auth";


const MttngRt= Router() 
//-----------------Rutas para Agendar Cita -----------------

//MttngRt.use(Authenticate)

//Crear una nueva cita
MttngRt.post('/', 
    InputErrors,
    meetingControllers.newMeeting
)

//Muetsra todas las reuniones
MttngRt.get('/',  
    InputErrors,
    meetingControllers.getAllMetting
)

//Busca la reunion por su Id
MttngRt.get('/:idM', 
    InputErrors,
    meetingControllers.getByMttng
)

//Actualiza los datos de la reunion
MttngRt.put('/:idM',
    InputErrors,
    meetingControllers.updateMttng
)


//Cancela la reunion
MttngRt.delete('/:idM',
    InputErrors,
    meetingControllers.cancelledMttng
)


export default MttngRt