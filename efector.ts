import {DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";

export class Efector extends Model {
    declare institutionName: string
    declare attentionLevel: number
    declare address:  string
    declare city : string
    declare telephoneNumber : string
    declare directions : string
    declare description : string
    declare webAddress : string
    declare neighbourhood : string
    declare province : string
    declare attentionHours : string
    declare attentionType : string
    declare isActive: boolean
}

Efector.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    institutionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    directions: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    webAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    neighbourhood: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attentionHours: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attentionType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attentionLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Efector' // We need to choose the model name
});
