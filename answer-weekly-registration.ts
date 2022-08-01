import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import { Patient } from "./patient";
import { QuestionWeeklyRegistration } from "./question-weekly-registration";

export class AnswerWeeklyRegistration extends Model {
    declare id: number;
    declare gestationalWeek: number;
    declare isAffirmative: boolean;
    declare QuestionWeeklyRegistrationId: number
    static Patient: BelongsTo<AnswerWeeklyRegistration, Patient>;
    static QuestionWeeklyRegistration: BelongsTo<AnswerWeeklyRegistration, QuestionWeeklyRegistration>;
}

AnswerWeeklyRegistration.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gestationalWeek: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isAffirmative: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'AnswerWeeklyRegistration'
});

export interface answerWeeklyRegistrationDTO {
    QuestionWeeklyRegistrationId: number;
    PatientId: number,
    isAffirmative: boolean
    gestationalWeek: number,
}