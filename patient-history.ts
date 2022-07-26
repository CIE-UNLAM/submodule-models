import {BelongsTo, DataTypes, HasMany, Model} from "sequelize";
import {DBManager} from "../utils/db";
import { Alert } from "./alert";
import { HistoryEvent } from "./history-event";
import { Patient } from "./patient";

export class PatientHistory extends Model {
    declare id: number;
    declare status: number;
    declare risk: number;
    static Alert: HasMany<PatientHistory, Alert>;
    static Patient: BelongsTo<PatientHistory, Patient>;
    static HistoryEvent: HasMany<PatientHistory, HistoryEvent>;
}

export enum HistoryStatus {
    INACTIVE = -1,
    ACTIVE = 1,
    REVIEW = 2, // TODO Que representa este estado?
    FINISH = 3
}

export enum HistoryRisk {
    NO_RISK = -1,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    SOS = 4
}

PatientHistory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: HistoryStatus.INACTIVE
    },
    risk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: HistoryRisk.NO_RISK
    },
},{
    sequelize: DBManager.getInstance(),
    modelName: 'PatientHistory'
    // TODO Revisar como queda el nombre de la tabla
});

export interface patientHistoryDTO {
    patientID: number;
    status: number;
    risk: number;
}





