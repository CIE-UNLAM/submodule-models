import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {User} from "./users";
import {BelongsTo, DataTypes, HasMany, HasOne, Model} from 'sequelize';
import {Control} from "./control";

export class Appointment extends Model{
    declare id: number;
    declare date: Date;
    declare confirmed: boolean;
    declare isVirtual: boolean;
    declare active: boolean;
    declare hasAssisted: boolean;

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
    confirmed: {
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
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Appointment' // We need to choose the model name
});