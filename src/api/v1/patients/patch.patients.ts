import {Request, Response} from "express";
import {DiagnoseModel} from "../../../db/models/diagnose_models";
import { PatientModel} from "../../../db/models/patient_models";
import { Gender, PatientHeight, PatientWeight } from "../../../enums/enums";
import Joi from "joi";


export const schema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    birthdate: Joi.date().required(),
    weight: Joi.number().integer().min(PatientWeight.MIN).max(PatientWeight.MAX).required(),
    height: Joi.number().integer().min(PatientHeight.MIN).max(PatientHeight.MAX).required(),
    identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
    gender: Joi.string().valid(Gender.MALE, Gender.FEMALE).required(),
    diagnoseID: Joi.number().integer().min(1).required()
  }),
  query: Joi.object(),
  params: Joi.object()
})


export const workflow = async (req: Request, res: Response) => {

  // use return in case of else part, findByPk -> findAll, ... - is not necessary, validate id number and birthdate

  const { params, body } = req

  const id = Number(params.id)

  const patientID: PatientModel = await PatientModel.findByPk(id)

  if (!patientID) {
    return res.status(404).json({ message: "Patient with this ID was not found", type: "FAILED" })
  }

  const diagnoseID = await DiagnoseModel.findByPk(body.diagnoseID)

  if (!diagnoseID) {
    return res.status(404).json({ message: "Diagnose with this ID does not exist in database", type: "FAILED" })
  }

  const patient = await PatientModel.update({
    ...body
  }, {
    where: {
      id
    }
  })

  return res.status(200).json({ message: "Patient data were succesfully updated", type: "SUCCESS" })
}