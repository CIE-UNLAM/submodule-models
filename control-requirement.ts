import {DBManager} from "../utils/db";
import {BelongsTo, DataTypes, HasMany, Model} from 'sequelize';
import {Appointment} from "./appointment";
import { Patient } from "./patient";
import { ControlRequirementList } from "./control-requirement-list";

export class ControlRequirement extends Model{
    declare id: number;
    declare description: string;
    declare isActive: boolean;

    static ControlRequirementList: HasMany<ControlRequirement, ControlRequirementList>;
}

ControlRequirement.init({
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
    modelName: 'ControlRequirement' // We need to choose the model name
});