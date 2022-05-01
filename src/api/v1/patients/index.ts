import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'

import * as GetPatients from './get.patients'
import * as PostPatient from './post.patient'
import * as PatchPatient from './patch.patients'
import * as DeletePatient from './delete.patients'

const router = Router()

export default () => {
  router.get('/', GetPatients.workflow)
  router.post('/', validationMiddleware(PostPatient.schema), PostPatient.workflow)
  router.patch('/:id', validationMiddleware(PatchPatient.schema), PatchPatient.workflow)
  router.delete('/:id', DeletePatient.workflow)
  return router
}
