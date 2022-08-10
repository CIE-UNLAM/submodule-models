import {BelongsTo, DataTypes, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {User} from "./users";
import {CustomError} from "../utils/http-response";
import httpStatus from "http-status-codes";

export class PostMedicalAssistance extends Model {
    declare id: number;
    declare number: number;
    declare weight: number;
    declare size: number;
    declare bloodPressure: string;
    static Patient: BelongsTo<PostMedicalAssistance, Patient>;
    static User: BelongsTo<PostMedicalAssistance, User>;
}

PostMedicalAssistance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        get() {
            return parseFloat(this.getDataValue('weight'));
        },
    },
    size: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        get() {
            return parseFloat(this.getDataValue('size'));
        },
    },
    bloodPressure: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        set(input: string) {
            if (input && (input.indexOf('/') === -1 || input.split('/').length !== 2) || input.match(/[0-9]+.\/.[0-9]+/g) == null) {
                throw new CustomError(httpStatus.BAD_REQUEST, 'El formato del campo presión arterial debe ser N/M');
            }
            this.setDataValue('bloodPressure', input);
        }
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'PostMedicalAssistance'
});

export interface PostMedicalAssistanceDTO {
    id?: number,
    number: number,
    weight: number,
    size: number,
    bloodPressure: string;
    PatientId: number,
    UserId?: number,
    AppointmentId?: number
}