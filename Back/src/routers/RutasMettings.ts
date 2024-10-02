import { Router } from "express"; 
import { InputErrors } from "../middleware/inputErrors";
import { body } from "express-validator";
import { meetingControllers } from "../controllers/MettingController";


const routerMetting= Router() 
//-----------------Rutas para Agendar Cita -----------------

routerMetting.post('/new',
    InputErrors,
    meetingControllers.newMeeting
)

routerMetting.get('/all',
    InputErrors,
    meetingControllers.getMetting
)

routerMetting.get('/meeting-id/:idM',
    InputErrors,
    meetingControllers.getByMttng
)

routerMetting.put('/update/:idM',
    InputErrors,
    meetingControllers.updateMttng
)

routerMetting.delete('/cancel/:idM',
    InputErrors,
    meetingControllers.cancelledMttng
)


export default routerMetting