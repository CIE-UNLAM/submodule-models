import {DBManager} from "../utils/db";
import {BelongsTo, DataTypes, HasMany, Model} from 'sequelize';
import {Appointment} from "./appointment";
import { Patient } from "./patient";
import {ControlRequirement} from "./control-requirement";
import { Control } from "./control";

export class ControlRequirementList extends Model{
    declare id: number;
    declare isActive: boolean;

    static ControlRequirement: BelongsTo<ControlRequirementList, ControlRequirement>;
    static Control: BelongsTo<ControlRequirementList, Control>;
}

ControlRequirementList.init({
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
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'ControlRequirementList' // We need to choose the model name
});