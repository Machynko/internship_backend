import { Sequelize, Model, DataTypes } from 'sequelize'
import { Models } from "../index";
import { Gender} from '../../enums'
import { DiagnoseModel } from './diagnoses'


export class PatientModel extends Model {

    id: number
    first_Name: string
    last_Name: string
    birth_date: Date
    weight: number
    height: number
    gender: Gender
    id_number: string
    diagnose_id: number
    diagnose: DiagnoseModel

}

export default (sequelize: Sequelize, modelName: string) => {

    PatientModel.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        first_Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        last_Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_number: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true
        },
        gender: {
            type: DataTypes.ENUM(Gender.MALE, Gender.FEMALE),
            allowNull: false
        },
        diagnose_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: false,
        timestamps: false,
        sequelize,
        modelName,
        tableName: 'patients'
    });

    (PatientModel as any).associate = (models: Models) => {
        PatientModel.belongsTo(models.Diagnose, { foreignKey: 'diagnoseID'})
    }

    return PatientModel
}
