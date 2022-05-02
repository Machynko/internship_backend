import {Router} from 'express'

import validationMiddleware from "../../../middlewares/validationMiddleware";
import * as GetPatients from './get.patients'
import * as PostPatients from './post.patients'
import * as DeletePatients from './delete.patients'
import * as PatchPatients from './patch.patients'
import passport from "passport";
import permissionMiddleware from "../../../middlewares/permissionMiddleware";
import {UserRole} from "../../../enums/enums";

const router = Router()

export default () => {
    router.get('/',
        passport.authenticate('jwt-api'),
        permissionMiddleware([UserRole.ADMIN]),
        validationMiddleware(GetPatients.patient_schema),
        GetPatients.workflow)
    router.post('/',
        passport.authenticate('jwt-api'),
        permissionMiddleware([UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]),
        validationMiddleware(PostPatients.schema),
        PostPatients.workflow)
    router.patch('/:patientId',
        passport.authenticate('jwp-api'),
        permissionMiddleware([UserRole.SUPER_ADMIN]),
        validationMiddleware(PatchPatients.schema),
        PatchPatients.workflow)
    router.delete('/:patientId', 
        passport.authenticate('jwt-api'),
        permissionMiddleware([UserRole.SUPER_ADMIN]),
        validationMiddleware(DeletePatients.schema),
        DeletePatients.workflow)
    
    return router
}
