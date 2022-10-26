import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import { PatientHistory } from "./patient-history";
import { Symptom } from "./symptom";

export class Alert extends Model {
    declare id: number;
    declare isViewed: boolean;
    declare risk: number;
    declare gestationalWeek: number;
    static PatientHistory: BelongsTo<Alert, PatientHistory>;
    static Symptom: BelongsTo<Alert, Symptom>;
}

Alert.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    risk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isViewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gestationalWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Alert'
});

export interface alertDTO {
    id?: number,
    risk: number,
    isViewed?: boolean,
    gestationalWeek: number,
    PatientHistoryId?: number,
    SymptomId: number
}

export enum AlertRisk {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    SOS = 4
}