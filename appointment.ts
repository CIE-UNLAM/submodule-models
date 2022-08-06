import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {User} from "./users";
import {BelongsTo, DataTypes, HasMany, HasOne, Model} from 'sequelize';
import {Control} from "./control";

export class Appointment extends Model{
    declare id: number;
    declare date: Date;
    declare isConfirmed: boolean;
    declare isVirtual: boolean;
    declare isActive: boolean;
    declare hasAssisted: boolean;
    declare title: string;

    static Medic: BelongsTo<Appointment, User>;
    static Patient: BelongsTo<Appointment, Patient>;
    static Control: BelongsTo<Appointment, Control>;
}

Appointment.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isVirtual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    hasAssisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: true
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Appointment' // We need to choose the model name
});

export interface InputAppointmentListDTO {
    medicUsername? : string,
    patientUsername? : string,
    dateFrom? : string,
    dateTo? : string,
    all?: boolean
}

export interface InputAppointmentCreationDTO {
    patientUsername : string,
    medicUsername : string,
    title? : string,
    date : string,
    isConfirmed : boolean,
    isVirtual : boolean,
    ControlId?: number
}

export interface InputAppointmentUpdateDTO {
    appointmentId : number,
    patientUsername? : string,
    medicUsername? : string,
    title? : string,
    date? : string,
    isConfirmed? : boolean,
    isVirtual? : boolean,
    ControlId?: number,
    isActive? : boolean,
    hasAssisted?: boolean
}