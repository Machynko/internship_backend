import { Request, Response } from 'express'
import {models} from "../../../db";
import {DiagnoseModel} from "../../../db/models/diagnoses";
import {SubstanceModel} from "../../../db/models/substance";




export const workflow = (req: Request, res: Response) => {

    const {
        Patient
    } = models
    const id = Number(req.params.id)

    const patient = Patient.findByPk(id, {
        include: {
            model: DiagnoseModel,
            include: [{
                model: SubstanceModel
            }]
        }
    })

    if(!patient){
        res.status(404).send("Patinet with this ID was not found")
    } else {
        res.status(200).json({
            patient
        })
    }
}

