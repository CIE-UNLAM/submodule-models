import {DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";

export class RiskFactorPatient extends Model {
    declare id: number;
    declare PatientId: number;
    declare RiskFactorId: number;
}

RiskFactorPatient.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'RiskFactorPatient'
});

export interface RiskFactorPatientHTTPInput {
    PatientId: number,
    riskFactors: number[]
}

export interface RiskFactorPatientDTO {
    PatientId: number,
    RiskFactorId: number
}
