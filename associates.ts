import {Article} from "./article";
import {Tag} from "./tag";
import {PatientHistory} from "./patient-history";
import {Alert} from "./alert";
import {Patient} from "./patient";
import {HistoryEvent} from "./history-event";
import {User} from "./users";
import {AnsweredQuestions, AnswerRegistroBiosocial, QuestionRegistroBiosocial} from "./registro-biosocial";
import {Appointment} from "./appointment";
import {Control} from "./control";
import {QuestionWeeklyRegistration} from "./question-weekly-registration";
import {Symptom} from "./symptom";
import {SymptomRecommendation} from "./symptom-recommendation";
import {AnswerWeeklyRegistration} from "./answer-weekly-registration";
import {AnswerSymptom} from "./answer-symptom";
import {WeeklySymptomReport} from "./weekly-symptom-report";
import {PostMedicalAssistance} from "./post-medical-assistance";

export function associate() {
    // Users Service
    User.Patient = User.hasOne(Patient);
    Patient.User = Patient.belongsTo(User);
    QuestionRegistroBiosocial.AnswerRegistroBiosocial = QuestionRegistroBiosocial.hasMany(AnswerRegistroBiosocial, {onDelete: 'CASCADE'});
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
    User.Appointment = User.hasMany(Appointment);
    Patient.Appointment = Patient.hasMany(Appointment);
    Appointment.Patient = Appointment.belongsTo(Patient);
    Appointment.Medic = Appointment.belongsTo(User);
    Control.Appointment = Control.hasOne(Appointment);
    Control.Patient = Control.belongsTo(Patient);
    Appointment.Control = Appointment.belongsTo(Control);
    Patient.Control = Patient.hasMany(Control);
    QuestionWeeklyRegistration.Symptom = QuestionWeeklyRegistration.hasMany(Symptom);
    Symptom.QuestionWeeklyRegistration = Symptom.belongsTo(QuestionWeeklyRegistration);
    Symptom.Alert = Symptom.hasMany(Alert);
    Alert.Symptom = Alert.belongsTo(Symptom);
    SymptomRecommendation.Symptom = SymptomRecommendation.hasMany(Symptom)
    Symptom.SymptomRecommendation = Symptom.belongsTo(SymptomRecommendation);
    Patient.PostMedicalAssistance = Patient.hasMany(PostMedicalAssistance);
    PostMedicalAssistance.Patient = PostMedicalAssistance.belongsTo(Patient);
    User.PostMedicalAssistance = User.hasMany(PostMedicalAssistance);
    PostMedicalAssistance.User = PostMedicalAssistance.belongsTo(User);

    // Mobile Service
    QuestionWeeklyRegistration.AnswerWeeklyRegistration = QuestionWeeklyRegistration.hasMany(AnswerWeeklyRegistration);
    AnswerWeeklyRegistration.QuestionWeeklyRegistration = AnswerWeeklyRegistration.belongsTo(QuestionWeeklyRegistration);
    Patient.AnswerWeeklyRegistration = Patient.hasMany(AnswerWeeklyRegistration);
    AnswerWeeklyRegistration.Patient = AnswerWeeklyRegistration.belongsTo(Patient);
    Patient.AnswerSymptom = Patient.hasMany(AnswerSymptom);
    AnswerSymptom.Patient = AnswerSymptom.belongsTo(Patient);
    AnswerSymptom.Symptom = AnswerSymptom.belongsTo(Symptom);
    Symptom.AnswerSymptom = Symptom.hasMany(AnswerSymptom);
    Patient.WeeklySymptomReport = Patient.hasMany(WeeklySymptomReport);
    WeeklySymptomReport.Patient = WeeklySymptomReport.belongsTo(Patient);
}
