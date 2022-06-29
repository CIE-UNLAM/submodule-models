import {Patient} from "./patient";
import {User} from "./users";
import {
    AnsweredQuestions,
    AnswerRegistroBiosocial,
    QuestionRegistroBiosocial,
    QuestionType
} from "./registro-biosocial";

export const associate = () => {
    User.Patient = User.hasOne(Patient);
    Patient.User = Patient.belongsTo(User);
    QuestionRegistroBiosocial.AnswerRegistroBiosocial = QuestionRegistroBiosocial.hasMany(AnswerRegistroBiosocial, { onDelete: 'CASCADE' });
    AnswerRegistroBiosocial.QuestionRegistroBiosocial = AnswerRegistroBiosocial.belongsTo(QuestionRegistroBiosocial);

    // Super Many-to-Many relationship
    // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship
    AnswerRegistroBiosocial.belongsToMany(User, {through: AnsweredQuestions});
    User.belongsToMany(AnswerRegistroBiosocial, {through: AnsweredQuestions});
    AnsweredQuestions.belongsTo(User);
    User.hasMany(AnsweredQuestions);
    AnsweredQuestions.belongsTo(AnswerRegistroBiosocial);
    AnswerRegistroBiosocial.hasMany(AnsweredQuestions);
}