import {DataTypes, Model, Sequelize} from "sequelize";
import { Models } from "../index";
import { SubstanceModel } from "./substance_models";
import { PatientModel } from "./patient_models";

export class DiagnoseModel extends Model {
  id: number
  name: string
  description: string

  substanceID: number
  substance: SubstanceModel
  patients: PatientModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
  DiagnoseModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      substanceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      timestamps: false,
      sequelize,
      modelName,
      tableName: 'diagnoses',
    }
  );
