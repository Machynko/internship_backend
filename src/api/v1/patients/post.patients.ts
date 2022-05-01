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

  const patientID: PatientModel[] = await PatientModel.findAll({
    where: {
      identificationNumber: req.body.identificationNumber
    }
  })

  if (patientID.length > 0) {
    res.status(409).json({ message: "Patient with this ID already exists in database", type: "FAILED" })
  } else {
    const diagnoseID = await DiagnoseModel.findAll({
      where: {
        id: req.body.diagnoseID
      }
    })

    if (diagnoseID.length == 0) {
      res.status(404).json({ message: "Diagnose with this ID does not exist in database", type: "FAILED" })
    } else {
      const patient = await PatientModel.create({
        ...req.body
      })
      res.status(200).json({ message: "Patient was succesfully added into database", type: "SUCCESS" })
    }
  }
}
