import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {HistoryStatus, PatientHistory} from "./patient-history";
import {PredefinedEvent} from "./predefined-event";

export class HistoryEvent extends Model {
    declare id: number;
    declare event: string;
    declare detail: string;
    declare createdBy: string;
    static PatientHistory: BelongsTo<HistoryEvent, PatientHistory>;
}

HistoryEvent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: HistoryStatus.ACTIVE
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize: DBManager.getInstance(),
    modelName: 'HistoryEvent'
    // TODO Revisar como queda el nombre de la tabla
});

export interface historyEventDTO {
    event: string;
    detail: string;
    createdBy: string;
    PatientHistoryId: number;
}