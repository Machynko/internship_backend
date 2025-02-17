import {DataTypes, Model, Sequelize} from "sequelize";
import { SubstanceModel } from "./substance_models";
import { PatientModel } from "./patient_models";
import { Models } from "../index";

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

  (DiagnoseModel as any).associate = (models: Models) => {
    DiagnoseModel.belongsTo(models.Substance, {foreignKey: 'substanceID'})
    DiagnoseModel.hasMany(models.Patient, {foreignKey: 'diagnoseID'})
  }
  return DiagnoseModel
}
