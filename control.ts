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
        defaultValue: {},
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Control' // We need to choose the model name
});