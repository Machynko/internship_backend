import {Request, Response} from 'express';
import { map } from "lodash";
import { models} from "../../../db";
import { Gender, PersonType, TimeUnit } from "../../../enums/enums";
import Joi from "joi";
import { PatientHeight, PatientWeight } from "../../../enums/enums";
import { PatientModel } from "../../../db/models/patient_models";
import { DiagnoseModel } from "../../../db/models/diagnose_models";
import { SubstanceModel } from "../../../db/models/substance_models";
import moment from "moment";


export const patient_schema = Joi.object({
  body: Joi.object({
    id: Joi.number().integer().min(1).required(),
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    birthdate: Joi.date().iso().required(),
    weight: Joi.number().integer().min(PatientWeight.MIN).max(PatientWeight.MAX).required(),
    height: Joi.number().integer().min(PatientHeight.MIN).max(PatientHeight.MAX).required(),
    identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
    gender: Joi.string().valid(Gender.MALE, Gender.FEMALE).required(),
    diagnoseID: Joi.number().integer().min(1).required(),
    age: Joi.number().min(0).max(120).required(),
    personType: Joi.valid(PersonType.CHILD, PersonType.ADULT).required(),

    diagnose: Joi.object({
      id: Joi.number().integer().min(1).required(),
      name: Joi.string().max(100).required(),
      description: Joi.string().max(200).required(),

      substance: Joi.object({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().max(100).required(),
        timeUnit: Joi.string().valid(TimeUnit).required(),
        halfLife: Joi.number().min(0).required()
      }).required()

    }).required()
  }),
  query: Joi.object(),
  params: Joi.object()
})

export const response_schema = Joi.object({
  patients: Joi.array().items(patient_schema),
  count: Joi.number()
})

export const getAge = (birthdate: any): number => {
  return moment().diff(birthdate, 'years');
}

export const getPersonType = (value: number) => {
  return value >= 18 ? PersonType.ADULT : PersonType.CHILD;
}


export const workflow = async (req: Request, res: Response) => {
  const { Patient } = models
  const patients: PatientModel[] = await Patient.findAll({
    include: {
      model: DiagnoseModel,
      include: [{
        model: SubstanceModel
      }]
    }
  })

  if (!patients) return res.status(404).send('Patients were not found')



  res.json({
    patients: map(patients, (patient) => {
      const age: number = getAge(patient.birthdate)
      const personType: PersonType = getPersonType(age)
      return {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        birthdate: patient.birthdate,
        weight: patient.weight,
        height: patient.height,
        identificationNumber: patient.identificationNumber,
        gender: patient.gender,
        diagnoseID: patient.diagnoseID,
        age: age,
        personType: personType,
        diagnose: patient.diagnose

      }
    } )
  })


}
