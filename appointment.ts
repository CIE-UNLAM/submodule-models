import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {User} from "./users";
import {BelongsTo, DataTypes, Model} from 'sequelize';

export class Appointment extends Model{
    declare id: number;
    declare title: string;
    declare date: Date;
    declare confirmed: boolean;
    declare isVirtual: boolean;
    declare active: boolean;

    static Medic: BelongsTo<Appointment, User>;
    static Patient: BelongsTo<Appointment, Patient>;
}

Appointment.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    isVirtual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Appointment' // We need to choose the model name
});