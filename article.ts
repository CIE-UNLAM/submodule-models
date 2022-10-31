import {DataTypes, HasMany, HasOne, Model} from "sequelize";
import {DBManager} from "../utils/db";
import {ArticleRanking} from "./article-ranking";
import {Tag} from "./tag"

export class Article extends Model {
    declare id: number;
    declare title: string;
    declare body: string;
    declare tags: Tag[];
    static Tag: HasMany<Article, Tag>;
    static ArticleRanking: HasOne<Article, ArticleRanking>;

    static getSearchVector() {
        return 'article_vector';
    }

    static async addFullTextIndex() {
        let searchFields = ['title', 'body'];
        let vectorName = Article.getSearchVector();
        await DBManager.getInstance().query(`ALTER TABLE "${Article.tableName}" DROP COLUMN IF EXISTS ${vectorName};`);
        await DBManager.getInstance().query(`ALTER TABLE "${Article.tableName}" ADD COLUMN "${vectorName}" TSVECTOR;`);
        await DBManager.getInstance().query(`UPDATE "${Article.tableName}" SET "${vectorName}" = to_tsvector('spanish', ${searchFields.join(' || \' \' || ')});`);
        await DBManager.getInstance().query(`DROP INDEX IF EXISTS post_search_idx;`)
        // Se comenta el uso del indice unaccent_search_idx debido a que en las pruebas resulto mas costo que no usarlo
        // await DBManager.getInstance().query(`DROP INDEX IF EXISTS unaccent_search_idx;`)
        await DBManager.getInstance().query(`CREATE INDEX post_search_idx ON "${Article.tableName}" USING gin("${vectorName}");`);
        await DBManager.getInstance().query(`CREATE EXTENSION IF NOT EXISTS unaccent;`);
        // await DBManager.getInstance().query(`CREATE OR REPLACE FUNCTION fn_unaccent(query text) RETURNS text AS $BODY$ select unaccent($1); $BODY$ LANGUAGE sql IMMUTABLE;`);
        // await DBManager.getInstance().query(`CREATE INDEX unaccent_search_idx ON "${Article.tableName}"(fn_unaccent(title));`);
        await DBManager.getInstance().query(`DROP TRIGGER IF EXISTS post_vector_update on "${Article.tableName}";`)
        await DBManager.getInstance().query(`CREATE TRIGGER post_vector_update BEFORE INSERT OR UPDATE ON "${Article.tableName}" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${vectorName}", 'pg_catalog.spanish', ${searchFields.join(', ')});`);
    }

    static search(query: string) {
        return DBManager.getInstance().query(`SELECT id, title, body, "createdAt", "updatedAt" from "${Article.tableName}" WHERE ${Article.getSearchVector()} @@ plainto_tsquery('spanish', :query) OR unaccent(title) ilike unaccent(:title);`, {
            model: Article,
            replacements: {query: query, title: ('%' + query + '%')}
        });
    }
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
        type: DataTypes.TEXT,
        allowNull: false
    },
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