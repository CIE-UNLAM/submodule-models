import {BelongsTo, DataTypes, Model} from "sequelize";
import {Patient} from "./patient";
import {DBManager} from "../utils/db";

export class GuardAssistance extends Model {
    declare id: number;
    declare assisted: boolean;
    declare motive: string;
    declare detail: string;
    static Patient: BelongsTo<GuardAssistance, Patient>;
}

GuardAssistance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    assisted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    motive: {
        type: DataTypes.STRING,
        allowNull: true
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'GuardAssistance'
});

export interface GuardAssistanceHTTPInput {
    assisted: boolean,
    motive?: string,
    detail?: string,
    PatientId: number
}

interface GuardAssistanceMotive {
    id: number,
    label: string,
    canWrite: boolean
}

export const GUARD_ASSISTANCE_MOTIVES: GuardAssistanceMotive[] = [
    {id: 1, label: "Dificultad económica para trasladarme", canWrite: false},
    {id: 2, label: "Dificultad en la organización familiar para asistir", canWrite: false},
    {id: 3, label: "No me pareció importante la recomendación de asistir a guardia", canWrite: false},
    {id: 4, label: "Otro", canWrite: true},
];