import {DataTypes, Model, Sequelize} from "sequelize";
import {DiagnoseModel} from "./diagnose_models";
import {TimeUnit} from "../../enums/enums";
import { Models } from "../index";

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: TimeUnit
    halfLife: number

  diagnoses: DiagnoseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
    SubstanceModel.init(
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
            timeUnit: {
                type: DataTypes.ENUM(...Object.values(TimeUnit)),
                allowNull: false,
            },
            halfLife: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            // foreign keys
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'substances',
        });


    (SubstanceModel as any).associate = (models: Models) => {
        SubstanceModel.hasOne(models.Diagnose, { foreignKey: 'substanceID' })
    }

    return SubstanceModel
}
