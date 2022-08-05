import {DataTypes, HasMany, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {FinishedPatient} from "./finished-patient";

export class Efector extends Model {
    declare institutionName: string
    declare administrativeArea: string
    declare attentionLevel: number
    declare availableCityList:  Array<string>
    declare active: boolean

    static FinishedPatient: HasMany<Efector,FinishedPatient>;

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
    administrativeArea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attentionLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    availableCityList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Efector' // We need to choose the model name
});
