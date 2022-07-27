import {DBManager} from "../utils/db";
import {DataTypes, HasMany, Model} from 'sequelize';
import {Appointment} from "./appointment";

export class CheckType extends Model{
    declare id: number;
    declare title: string;
    declare description: string;
    declare pregnantCategory: number;
    declare active: boolean;
    declare weeks: Array<number>;
    declare isVirtual: boolean;
    static Appointment: HasMany<CheckType, Appointment>;
}

CheckType.init({
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
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pregnantCategory: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    weeks: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    isVirtual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'CheckType' // We need to choose the model name
});