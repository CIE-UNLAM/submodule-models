import {DataTypes, HasMany, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {Tag} from "./tag"

export class Article extends Model {
    declare id: number;
    declare title: string;
    declare body: string;
    declare tags: Tag[];
    static Tag: HasMany<Article, Tag>;
}

Article.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Article'
});

export interface ArticleDTO {
    id: number;
    title: string;
    body: string;
    tags: string[];
}