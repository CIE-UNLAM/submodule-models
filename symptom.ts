import {DBManager} from "../utils/db";
import {BelongsTo, DataTypes, HasMany, Model} from "sequelize";
import { QuestionWeeklyRegistration } from "./question-weekly-registration";
import { Alert } from "./alert";
import { SymptomRecommendation } from "./symptom-recommendation";

export class Symptom extends Model {
    declare id: number;
    declare active: boolean;
    declare label: string;
    declare level: SymptomLevel;
    static Alert: HasMany<Symptom, Alert>;
    static QuestionWeeklyRegistration: BelongsTo<Symptom, QuestionWeeklyRegistration>;
    static SymptomRecommendation: BelongsTo<Symptom, SymptomRecommendation>;
}

Symptom.init({
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
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Symptom'
});

export interface symptomDTO {
    id: number,
    label: string,
    level: number
}

export enum SymptomLevel {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    SOS = 4
}
