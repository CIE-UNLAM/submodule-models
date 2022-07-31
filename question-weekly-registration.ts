import {DBManager} from "../utils/db";
import {DataTypes, HasMany, Model} from "sequelize";
import { Symptom } from "./symptom";
import { AnswerWeeklyRegistration } from "./answer-weekly-registration";

export class QuestionWeeklyRegistration extends Model {
    declare id: number;
    declare active: boolean;
    declare title: string;
    declare description : string;
    declare isMultiSelection: boolean;
    declare startWeek: number;
    declare endWeek: number;
    declare Symptoms: Symptom[];
    static Symptom: HasMany<QuestionWeeklyRegistration, Symptom>;
    static AnswerWeeklyRegistration: HasMany<QuestionWeeklyRegistration, AnswerWeeklyRegistration>;
}

QuestionWeeklyRegistration.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isMultiSelection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    startWeek: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endWeek: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'QuestionWeeklyRegistration'
});

export interface questionWeeklyRegistrationDTO {
    id: number,
    title: string,
    description: string,
    isMultiSelection: boolean,
    startWeek: number,
    endWeek: number
}