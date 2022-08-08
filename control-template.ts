import {DBManager} from "../utils/db";
import {DataTypes, Model} from 'sequelize';

export class ControlTemplate extends Model{
    declare id: number;
    declare description: string;
    declare isActive: boolean;
    declare weekFrom: number;
    declare weekTo: number;
    declare isVirtual: boolean;
}

ControlTemplate.init({
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
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'ControlTemplate' // We need to choose the model name
});