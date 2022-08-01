import {DBManager} from "../utils/db";
import {BelongsTo, DataTypes, HasMany, Model} from "sequelize";
import { Symptom } from "./symptom";

export class SymptomRecommendation extends Model {
    declare id: number;
    declare active: boolean;
    declare recommendation: string;
    static Symptom: HasMany<SymptomRecommendation, Symptom>;
}

SymptomRecommendation.init({
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
    recommendation: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'SymptomRecommendation'
});

export interface symptomRecommendationDTO {
    id: number,
    recommendation: string
}