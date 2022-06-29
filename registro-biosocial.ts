import {BelongsTo, DataTypes, HasMany, Model} from "sequelize";
import {DBManager} from "../utils/db";

export enum QuestionType  {
    SIMPLE_SELECTION = 1,
    MULTI_SELECTION
}

export class QuestionRegistroBiosocial extends Model {
    declare id: number
    declare question: string
    declare type: number
    declare hasDefaultAnswer: boolean
    static AnswerRegistroBiosocial: HasMany<QuestionRegistroBiosocial, AnswerRegistroBiosocial>;
}

QuestionRegistroBiosocial.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order: {
        type: DataTypes.INTEGER,
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: QuestionType.SIMPLE_SELECTION
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Question'
});

export class AnswerRegistroBiosocial extends Model {
    declare id: number;
    declare answer: string;
    declare isAlternativeAnswer: boolean;
    static QuestionRegistroBiosocial: BelongsTo<AnswerRegistroBiosocial, QuestionRegistroBiosocial>;
}

AnswerRegistroBiosocial.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    isAlternativeAnswer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'Answer'
});

export class AnsweredQuestions extends Model {
    declare alternativeAnswer: string
}

AnsweredQuestions.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    alternativeAnswer: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: DBManager.getInstance(),
    modelName: 'AnsweredQuestions'
});

export class QuestionDTO {
    id: number;
    question: string;
    type: number;
    answered: boolean;
    answers: AnswerDTO[] = [];

    constructor(id: number, question: string, type: number, answered: boolean) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.answered = answered;
    }
}

export class AnswerDTO {
    id: number;
    answer: string;
    selected: boolean
    isAlternativeAnswer: boolean;
    alternativeAnswer: string;

    constructor(id: number, answer: string, selected: boolean, isAlternativeAnswer: boolean, alternativeAnswer?: string) {
        this.id = id;
        this.answer = answer;
        this.selected = selected;
        this.isAlternativeAnswer = isAlternativeAnswer;
        this.alternativeAnswer = alternativeAnswer || "";
    }
}
