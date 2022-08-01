import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import { Patient } from "./patient";
import { Symptom } from "./symptom";

export class AnswerSymptom extends Model {
    declare id: number;
    declare gestationalWeek: number;
    static Patient: BelongsTo<AnswerSymptom, Patient>;
    static Symptom: BelongsTo<AnswerSymptom, Symptom>;
}

AnswerSymptom.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gestationalWeek: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'AnswerSymptom'
});

export interface answerSymptomDTO {
    id?: number,
    SymptomId: number,
    gestationalWeek: number,
    PatientId: number
}