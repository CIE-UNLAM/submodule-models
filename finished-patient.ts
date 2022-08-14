import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {User} from "./users";
import {Efector} from "./efector";

export class FinishedPatient extends Model {
    declare id: number;
    declare motive: string;
    declare notes: string;
    static Patient: BelongsTo<FinishedPatient, Patient>;
    static User: BelongsTo<FinishedPatient, User>;
    static Efector: BelongsTo<FinishedPatient, Efector>;
}

FinishedPatient.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        motive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize: DBManager.getInstance(), modelName: 'FinishedPatient'
    }
);

export interface FinishedPatientHTTPInput {
    PatientId?: number,
    motive: string,
    notes: string,
    UserId?: number,
    EfectorId?: number
}

export interface Motive {
    label: string
    isDerivation?: boolean
    canWrite?: boolean
}

export const MEDIC_MOTIVES: Motive[] = [
    {label: "Parto natural" },
    {label: "Parto prematuro"},
    {label: "Muerte fetal"},
    {label: "Derivación", isDerivation: true, canWrite: true}
];

export const PG_MOTIVES: Motive[] = [
    {label: "No le pareció practica", canWrite: true},
    {label: "No le pareció cómoda con la atención", canWrite: true},
    {label: "Distancia al hospital", canWrite: true},
    {label: "Dificultades con disponibilidad de horarios del hospital para los controles", canWrite: true},
    {label: "Otro", canWrite: true},
];