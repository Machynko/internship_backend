import { DataTypes, Model, Sequelize } from "sequelize";
import { UserRole} from "../../enums/enums";
import { PatientModel } from "./patient_models";

export class UserModel extends Model{
    id: number
    name: string
    role: string
    patientID: number
    patient: PatientModel
}

export default (sequelize: Sequelize, modelName: string) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
                allowNull: false,
                unique: true
            },
            patientID: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true
            }
        },
        {
            paranoid: false,
            timestamps: true,
            sequelize,
            modelName,
            tableName: 'users'
        }
    );

    return UserModel
}
