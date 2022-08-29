import { DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";

export class Report extends Model{
    declare id: number;
    declare reportName: string;
    declare storedProcedure: string;
    declare searchParams: string[];
}

Report.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reportName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storedProcedure: {
        type: DataTypes.STRING,
        allowNull: false
    },
    searchParams: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
    },{
    sequelize: DBManager.getInstance(),
    modelName: 'Report'

});

export interface reportInput {
     id?: number;
     reportName: string;
     storedProcedure: string;
     searchParams: string[];
}