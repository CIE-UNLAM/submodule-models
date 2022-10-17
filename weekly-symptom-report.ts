import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Patient} from "./patient";

export class WeeklySymptomReport extends Model {
    declare id: number;
    declare gestationalWeek: number;
    declare percentComplete: number;
    declare isComplete: number;
    static Patient: BelongsTo<WeeklySymptomReport, Patient>;
}

WeeklySymptomReport.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gestationalWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    percentComplete: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        // https://github.com/sequelize/sequelize/issues/8019
        get() {
            return parseFloat(this.getDataValue('percentComplete')).toFixed(2);
        },
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'WeeklySymptomReport'
});

export interface weeklySymptomReportHTTPIncoming {
    questionID: number,
    symptoms: number[]
}

export interface weeklySymptomReportHTTPOutput {
    reportWeek: number,
    canEditReport: boolean,
    questions: {
        id: number
        title: string,
        isMultiSelection: boolean,
        answered: boolean,
        isAffirmative: boolean,
        symptoms: {
            id: number,
            label: string,
            selected: boolean
        }[]
    }[],
}

export interface weeklySymptomReportResume {
    gestationalWeek: number,
    percentComplete: number,
    isComplete: boolean
}

export function newWeeklySymptomReportHTTPOutput(): weeklySymptomReportHTTPOutput {
    return {canEditReport: false, questions: [], reportWeek: 0};
}