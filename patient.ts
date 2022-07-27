import {BelongsTo, DataTypes, HasMany, HasOne, Model} from "sequelize";
import {DBManager} from "../utils/db";
import { Appointment } from "./appointment";
import {User} from "./users";
import {PatientHistory} from "./patient-history";
import {Control} from "./control";

export class Patient extends Model {
    declare id: number
    declare FUM: Date
    declare FPP: Date
    declare validatedFPP: boolean
    declare validated: boolean
    declare category: number

    static User: BelongsTo<Patient, User>;
    static Appointment: HasMany<Patient, Appointment>;
    static Control: HasMany<Patient, Control>;
    static PatientHistory: HasOne<Patient, PatientHistory>;

    static calculateFPP(FUM: Date): Date {
        let FPP = new Date();
        FPP.setDate(FUM.getDate() + 10);
        FPP.setMonth(FUM.getMonth() - 3);
        FPP.setFullYear(FPP.getFullYear() + 1);
        return FPP;
    }
}

Patient.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        validated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        FUM: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        FPP: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        validatedFPP: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {sequelize: DBManager.getInstance(), modelName: 'Patient'})

export const PREGNANT_CATEGORY = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
}
