import {BelongsTo, DataTypes, Model} from "sequelize";
import { DBManager } from "../utils/db";
import { Article } from "./article";

export class ArticleRanking extends Model{
    declare id: number;
    declare count: number;
    static Article: BelongsTo<ArticleRanking, Article>;
}

ArticleRanking.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'ArticleRanking' // We need to choose the model name
});