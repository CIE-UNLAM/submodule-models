import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import { PatientHistory } from "./patient-history";

export class Alert extends Model {
    declare id: number;
    declare isViewed: boolean;
    declare risk: number;
    static PatientHistory: BelongsTo<Alert, PatientHistory>;
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
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Alert'
});

export interface alertDTO {
    id: number,
    risk: number,
    isViewed: boolean,
    PatientHistoryId: number
}


export enum AlertRisk {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}
