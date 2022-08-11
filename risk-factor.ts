import {DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";

export class RiskFactor extends Model {
    declare id: number;
    declare active: boolean;
    declare description: string;
    declare type: RiskFactorType;
}

RiskFactor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'RiskFactor'
});

export enum RiskFactorType {
    PREVIOUS_RISK = 1,
    CURRENT_RISK = 2,
    SOCIAL_RISK = 3
}
