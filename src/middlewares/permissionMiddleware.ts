import { NextFunction, Request, Response } from "express";
import { UserRole} from "../enums/enums";

export default (permissions: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    try {
        if (!permissions.includes(user.role)) {
            throw new Error('Forbidden')
        }

        if (user.role === UserRole.USER) {
            const patientID: number = Number(req.params.patientId)
            if (user.patientID !== patientID) {
                throw new Error('Forbidden')
            }
        }

        return next()
    } catch (error) {
        return next(error)
    }

}
