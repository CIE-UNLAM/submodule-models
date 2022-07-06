import {BelongsTo, DataTypes, Model} from "sequelize";
import {Article} from "./article";
import {DBManager} from "../utils/db";

export class Tag extends Model {
    declare name: string;
    static Article: BelongsTo<Tag, Article>;
}

Tag.init({
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Tag'
});