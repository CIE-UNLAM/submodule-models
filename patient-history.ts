import {BelongsTo, DataTypes, HasMany, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Alert} from "./alert";
import {HistoryEvent} from "./history-event";
import {Patient} from "./patient";

export class PatientHistory extends Model {
    declare id: number;
    declare status: number;
    declare risk: number;
    declare updateAt: Date;
    static Alert: HasMany<PatientHistory, Alert>;
    static Patient: BelongsTo<PatientHistory, Patient>;
    static HistoryEvent: HasMany<PatientHistory, HistoryEvent>;

    static getRiskLabel(risk: HistoryRisk): string {
        switch (risk) {
            case HistoryRisk.NO_RISK:
                return "Sin riesgo";
            case HistoryRisk.LOW:
                return "Bajo";
            case HistoryRisk.MEDIUM:
                return "Medio";
            case HistoryRisk.HIGH:
                return "Alto";
            case HistoryRisk.SOS:
                return "Emergencia";
        }
    }

    static getStatusLabel(status: HistoryStatus): string {
        switch (status) {
            case HistoryStatus.INACTIVE:
                return "Inactivo";
            case HistoryStatus.ACTIVE:
                return "Activo";
            case HistoryStatus.REVIEW:
                return "En revision";
            case HistoryStatus.FINISH:
                return "Finalizado";
        }
    }
}

export enum HistoryStatus {
    INACTIVE = -1,
    ACTIVE = 1,
    REVIEW = 2,
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
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'PatientHistory'
});

export interface patientHistoryDTO {
    patientID: number;
    status: number;
    risk: number;
    updateAt?: Date;
}





