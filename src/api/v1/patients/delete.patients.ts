import { Request, Response} from "express";
import Joi from "joi";
import { models} from "../../../db";
import { Gender, PatientHeight, PatientWeight } from "../../../enums/enums";

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

  const {
    Patient
  } = models

  const id = Number(req.params.id)

  const patient = await Patient.destroy({
    where: {
      id
    }
  })

  if (!patient) {
    res.status(404).json({ message: "Patient with this ID was not found", type: "FAILED" })
  } else {
    res.status(200).json({ message: `Patient with ID ${id} was succesfully deleted`, type: "SUCCESS" })
  }
}
