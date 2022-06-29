import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {User} from "./users";

export class Patient extends Model {
    declare id: number
    declare FUM: Date
    declare FPP: Date
    declare validated: boolean
    declare category: number
    static User: BelongsTo<Patient, User>;

    static calculateFPP(FUM: Date): Date {
        let FPP = new Date()
        FPP.setDate(FUM.getDate() + 10)
        FPP.setMonth(FUM.getMonth() - 3)
        FPP.setFullYear(FUM.getFullYear() + 1)
        return FPP
    }
}

Patient.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        validated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        FUM: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        FPP: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {sequelize: DBManager.getInstance(), modelName: 'Patient'})

export const PREGNANT_CATEGORY = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
}
