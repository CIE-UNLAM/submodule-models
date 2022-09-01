import {DataTypes, HasMany, HasOne, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {compareSync, hashSync} from "bcrypt"
import {FinishedPatient} from "./finished-patient";
import {Appointment} from "./appointment";
import {PostMedicalAssistance} from "./post-medical-assistance";

export class User extends Model {
    declare id: number;
    declare email: string;
    declare username: string;
    declare docType: number;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare birthDate: Date;
    declare active: boolean;
    declare role: Array<number>;
    declare phone: string;
    declare alternativePhone: string;
    declare altPhoneDescription: string;
    declare deviceID: string;
    declare clientID: string;
    declare secretKey: string;
    declare device_token: string;
    declare Patient: Patient;

    static Patient: HasOne<User, Patient>;
    static Appointment: HasMany<User, Appointment>;
    static FinishedPatient: HasMany<User,FinishedPatient>;
    static PostMedicalAssistance: HasMany<User, PostMedicalAssistance>;

    public isValidPassword(p: string): boolean {
        return compareSync(p, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    secretKey: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            // https://codahale.com/how-to-safely-store-a-password/
            const hashed = hashSync(value, 10);
            this.setDataValue('password', hashed);
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    role: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    docType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alternativePhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    altPhoneDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deviceID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    device_token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'User'
});

export const DocType = {
    DNI: 1,
    PASAPORTE: 2,
    EXTRANJERO: 3
}
