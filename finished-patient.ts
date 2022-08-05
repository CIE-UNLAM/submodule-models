import {BelongsTo, DataTypes, HasMany, HasOne, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Patient} from "./patient";
import {User} from "./users";
import {Efector} from "./efector";

export class FinishedPatient extends Model {

    declare id: number;
    declare motivo: string;
    declare notas: string;

    static Patient: BelongsTo<FinishedPatient, Patient>;
    static User: BelongsTo<FinishedPatient, User>;
    static Efector: BelongsTo<FinishedPatient, Efector>;

}

FinishedPatient.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notas: {
            type: DataTypes.STRING,
            allowNull: true
        }

    },
    {sequelize: DBManager.getInstance(), modelName: 'FinishedPatient'}
);

//Lista de motivos de finalizacion, falta completar
export const Motivo = {
    PartoNatural: "Parto natural",
    PartoPrematuro: "Parto prematuro",
    MuerteFetal: "Muerte fetal",
    Derivacion: "Derivacion"
};
