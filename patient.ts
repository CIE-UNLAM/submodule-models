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
import {FinishedPatient} from "./finished-patient";
import {GuardAssistance} from "./guard-assistance";

export class Patient extends Model {
    declare id: number;
    declare FUM: Date;
    declare FPP: Date;
    declare validatedFPP: boolean;
    declare validated: boolean;
    declare previousRisk: number;
    declare socialRisk: number;
    declare currentRisk: number;
    declare preferenceDays: boolean[]; // Se tiene en cuenta que la semana empieza el lunes
    declare gestationalWeek: number;
    declare gender: string;
    declare User: User;
    declare FinishedPatient: FinishedPatient;

    static User: BelongsTo<Patient, User>;
    static Appointment: HasMany<Patient, Appointment>;
    static Control: HasMany<Patient, Control>;
    static PatientHistory: HasOne<Patient, PatientHistory>;
    static AnswerWeeklyRegistration: HasMany<Patient, AnswerWeeklyRegistration>;
    static AnswerSymptom: HasMany<Patient, AnswerSymptom>;
    static WeeklySymptomReport: HasMany<Patient, WeeklySymptomReport>;
    static FinishedPatient: HasOne<Patient, FinishedPatient>;
    static PostMedicalAssistance: HasMany<Patient, PostMedicalAssistance>;
    static GuardAssistance: HasMany<Patient, GuardAssistance>;

    static calculateFPP(FUM: Date): Date {
        let FPP = new Date(FUM);
        FPP.setDate(FUM.getDate() + 283);
        
        if (FPP < new Date()) {
            return new Date();
        }
        return FPP;
    }
}

export enum RISK_LEVEL {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
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
    previousRisk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: RISK_LEVEL.LOW
    },
    socialRisk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: RISK_LEVEL.LOW
    },
    currentRisk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: RISK_LEVEL.LOW
    },
    preferenceDays: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [0, 0, 0, 0, 0, 0, 0],
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Mujer Cis"
    }
}, {sequelize: DBManager.getInstance(), modelName: 'Patient'});

