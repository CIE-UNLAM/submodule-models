import {DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";

export class PredefinedEvent extends Model {
    declare id: number;
    declare event: string;
    declare type: number;
}

PredefinedEvent.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
},{
    sequelize: DBManager.getInstance(),
    modelName: 'PredefinedEvent'
});

