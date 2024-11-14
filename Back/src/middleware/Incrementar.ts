import { Request,Response,NextFunction } from "express"
export async function validatePet(req: Request, res: Response, next: NextFunction) {
    next()
};