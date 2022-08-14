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

    getFinishedStatus(): FINISHED_STATUS {
        if (this.motive === "Parto natural" || this.motive === "Parto prematuro" || this.motive === "Muerte fetal") {
            return FINISHED_STATUS.FINISHED_PREGNANCY;
        } else if (this.motive === "Imposibilidad de seguimiento") {
            return FINISHED_STATUS.UNABLE_TO_TRACK;
        } else if (this.motive === "Derivación") {
            return FINISHED_STATUS.DERIVATION;
        }
        return FINISHED_STATUS.UNSUBSCRIBE
    }
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
    {label: "Parto natural"},
    {label: "Parto prematuro", canWrite: true},
    {label: "Muerte fetal", canWrite: true},
    {label: "Imposibilidad de seguimiento", canWrite: true},
    {label: "Derivación", isDerivation: true, canWrite: true}
];

export const PG_MOTIVES: Motive[] = [
    {label: "No le pareció practica", canWrite: true},
    {label: "No le pareció cómoda la atención", canWrite: true},
    {label: "Distancia al hospital", canWrite: true},
    {label: "Dificultades con disponibilidad de horarios del hospital para los controles", canWrite: true},
    {label: "Otro", canWrite: true},
];

export enum FINISHED_STATUS {
    FINISHED_PREGNANCY = 1,
    DERIVATION = 2,
    UNABLE_TO_TRACK = 3,
    UNSUBSCRIBE = 4
}