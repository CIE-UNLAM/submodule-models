import {Article} from "./article";
import {Tag} from "./tag";
import {PatientHistory} from "./patient-history";
import {Alert} from "./alert";
import {Patient} from "./patient";
import {HistoryEvent} from "./history-event";
import {User} from "./users";
import {AnsweredQuestions, AnswerRegistroBiosocial, QuestionRegistroBiosocial} from "./registro-biosocial";

export function associate() {
    // Users Service
    User.Patient = User.hasOne(Patient);
    Patient.User = Patient.belongsTo(User);
    QuestionRegistroBiosocial.AnswerRegistroBiosocial = QuestionRegistroBiosocial.hasMany(AnswerRegistroBiosocial, { onDelete: 'CASCADE' });
    AnswerRegistroBiosocial.QuestionRegistroBiosocial = AnswerRegistroBiosocial.belongsTo(QuestionRegistroBiosocial);
    AnswerRegistroBiosocial.belongsToMany(User, {through: AnsweredQuestions});
    User.belongsToMany(AnswerRegistroBiosocial, {through: AnsweredQuestions});
    AnsweredQuestions.belongsTo(User);
    User.hasMany(AnsweredQuestions);
    AnsweredQuestions.belongsTo(AnswerRegistroBiosocial);
    AnswerRegistroBiosocial.hasMany(AnsweredQuestions);

    // Web Service
    Article.Tag = Article.hasMany(Tag);
    Tag.Article = Tag.belongsTo(Article);
    PatientHistory.Alert = PatientHistory.hasMany(Alert);
    Alert.PatientHistory = Alert.belongsTo(PatientHistory);
    Patient.PatientHistory = Patient.hasOne(PatientHistory);
    PatientHistory.Patient = PatientHistory.belongsTo(Patient);
    PatientHistory.HistoryEvent = PatientHistory.hasMany(HistoryEvent);
    HistoryEvent.PatientHistory = HistoryEvent.belongsTo(PatientHistory);
}
