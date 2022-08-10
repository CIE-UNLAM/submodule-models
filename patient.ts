import {BelongsTo, DataTypes, HasMany, HasOne, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Appointment} from "./appointment";
import {User} from "./users";
import {PatientHistory} from "./patient-history";
import {Control} from "./control";
import {AnswerWeeklyRegistration} from "./answer-weekly-registration";
import {AnswerSymptom} from "./answer-symptom";
import {WeeklySymptomReport} from "./weekly-symptom-report";
import {PostMedicalAssistance} from "./post-medical-assistance";

export class Patient extends Model {
    declare id: number
    declare FUM: Date
    declare FPP: Date
    declare validatedFPP: boolean
    declare validated: boolean
    declare category: number
    declare preferenceDays: boolean[] //Se tiene en cuenta que la semana empieza desde el lunes
    static User: BelongsTo<Patient, User>;
    static Appointment: HasMany<Patient, Appointment>;
    static Control: HasMany<Patient, Control>;
    static PatientHistory: HasOne<Patient, PatientHistory>;
    static AnswerWeeklyRegistration: HasMany<Patient, AnswerWeeklyRegistration>;
    static AnswerSymptom: HasMany<Patient, AnswerSymptom>;
    static WeeklySymptomReport: HasMany<Patient, WeeklySymptomReport>;
    static PostMedicalAssistance: HasMany<Patient, PostMedicalAssistance>;

    static calculateFPP(FUM: Date): Date {
        let FPP = new Date();
        FPP.setDate(FUM.getDate() + 10);
        FPP.setMonth(FUM.getMonth() - 3);
        FPP.setFullYear(FUM.getFullYear() + 1);
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
    },
    preferenceDays: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [0, 0, 0, 0, 0, 0, 0],
        allowNull: false
    }
}, {sequelize: DBManager.getInstance(), modelName: 'Patient'})

export const PREGNANT_CATEGORY = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
}

