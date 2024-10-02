import { Response, Request, NextFunction } from "express-serve-static-core";
import fileUpload from "express-fileupload";
import path from 'path';

const uploadsDir = path.join(__dirname,'..', 'uploads');

const saveImg = (req: Request, res: Response, next: NextFunction) => {
    fileUpload({
        useTempFiles: true,
        tempFileDir: uploadsDir
    })(req, res, next);
};
export default saveImg;
