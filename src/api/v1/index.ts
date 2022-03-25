import { Router } from 'express'
import PatientsRouter from './patiens'

const router = Router()

export default () => {
    router.use('/patients', PatientsRouter())

    return router
}
