import {DBManager} from "../utils/db";
import {BelongsTo, DataTypes, HasOne, Model} from 'sequelize';
import { Appointment } from "./appointment";
import { Patient } from "./patient";

export class Control extends Model{
    declare id: number;
    declare description: string;
    declare isActive: boolean;
    declare weekFrom: number;
    declare weekTo: number;
    declare isVirtual: boolean;
    declare requirements: Array<number>;
    declare title : string;

    static Appointment: HasOne<Control, Appointment>;
    static Patient: BelongsTo<Control, Patient>;
}

Control.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    weekFrom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weekTo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isVirtual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    requirements: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Control' // We need to choose the model name
});

export interface InputControlListDTO {
    username: string,
    limit: number,
    weekFrom: number,
    weekTo: number
}

export interface InputControlCreationDTO {
    username: string,
    description: string,
    weekFrom: number,
    weekTo: number,
    isVirtual: boolean,
    requirements: Array<number>
}

export enum ControlRequirementEnum {
    ECOGRAFIA = 1,
    LABORATORIO = 2,
    MONITOREO_FETAL = 3,
}