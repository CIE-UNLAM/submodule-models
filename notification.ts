import {DBManager} from "../utils/db";
import {DataTypes, Model} from 'sequelize';
import {CustomError} from "../utils/http-response";
import httpStatus from "http-status-codes";
import {Symptom, SymptomLevel} from "./symptom";
import {getRootSession} from "../utils/session";
import {WebAPI} from "../utils/net";
import {Appointment} from "./appointment";
import {Control} from "./control";
import {createDateWithoutTimezone} from "../utils/date";
import {NotificationRepository} from "../repositories/notifications";

export class Notification extends Model {
    declare id: number;
    declare type: NotificationType;
    declare recipient: string;
    declare title: string;
    declare body: string;
    declare viewed: boolean;
    declare deleted: boolean;
    declare scheduled: boolean;
    declare createdAt: Date;

    async fillFields() {
        await this.setTitle();
        await this.setBody();
    }

    public setTitle() {
        throw 'not implemented';
    }

    public setBody() {
        throw 'not implemented';
    }
}

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    scheduled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    // Other model options go here
    sequelize: DBManager.getInstance(), // We need to pass the connection instance
    modelName: 'Notification' // We need to choose the model name
});

export enum NotificationType {
    CONTROL_WITHOUT_APPOINTMENT = 10,
    WEEKLY_SYMPTOM_REPORT = 20,
    MASSIVE_DELIVERY = 30,
    APPOINTMENT_REMINDER = 40,
    SYMPTOM_RECOMMENDATION = 50,
    GUARD_ASSISTANCE = 60
}

export interface NotificationDTO {
    type: NotificationType,
    title?: string,
    body?: string,
    symptomID?: number,
    symptom?: Symptom,
    recipients: string[],
    appointment?: Appointment,
    control?: Control
}

export async function buildNotificationFromType(input: NotificationDTO, recipient: string): Promise<Notification> {
    let ret: Notification;
    switch (input.type) {
        case NotificationType.SYMPTOM_RECOMMENDATION: {
            if (!input.symptomID) {
                throw 'unable to create symptom recommendation notification';
            }
            ret = new RecommendationNotification(input.symptomID, recipient);
            break;
        }
        case NotificationType.MASSIVE_DELIVERY: {
            if (!input.title || !input.body) {
                throw 'unable to create massive delivery notification';
            }
            ret = new MassiveDeliveryNotification(input.title, input.body);
            break;
        }
        case NotificationType.WEEKLY_SYMPTOM_REPORT: {
            ret = new WeeklySymptomReportNotification();
            break;
        }
        case NotificationType.APPOINTMENT_REMINDER: {
            if (!input.appointment) {
                throw 'unable to create appointment reminder notification';
            }
            ret = new AppointmentReminderNotification(input.appointment);
            break;
        }
        case NotificationType.CONTROL_WITHOUT_APPOINTMENT: {
            if (!input.control) {
                throw 'unable to create control without appointment notification';
            }
            ret = new ControlWithoutAppointmentNotification(input.control);
            break;
        }
        case NotificationType.GUARD_ASSISTANCE: {
            if (!input.symptom) {
                throw 'unable to create guard assistance notification';
            }
            ret = new GuardAssistanceNotification(input.symptom);
            break;
        }
        default: {
            throw new CustomError(httpStatus.BAD_REQUEST, 'No se pudo construir la notificación');
        }
    }
    ret.type = input.type;
    await ret.fillFields();
    ret.recipient = recipient;
    return ret;
}

export class RecommendationNotification extends Notification {
    public symptomID!: number;
    private symptom!: Symptom;
    private readonly customRecipient!: string;

    constructor(symptomID: number, customRecipient: string) {
        super();
        this.symptomID = symptomID;
        this.customRecipient = customRecipient;
    }

    private async init() {
        await this.fillSymptom();
        await this.createAssistanceGuardNotification();
    }

    public async setTitle() {
        await this.init();
        this.title = `Recomendación según síntoma - ${this.symptom.label}`;
    }

    public async setBody() {
        this.body = `Tu recomendación es: ${this.symptom.SymptomRecommendation.recommendation}`;
    }

    private async fillSymptom() {
        if (!this.symptom) {
            const session = await getRootSession();
            const api = new WebAPI(session);
            this.symptom = <Symptom>await api.get(`/api/1/symptoms/${this.symptomID}`);
        }
    }

    private async createAssistanceGuardNotification() {
        if (this.symptom.level === SymptomLevel.HIGH || this.symptom.level === SymptomLevel.SOS) {
            const nr = new NotificationRepository();
            const n = await buildNotificationFromType({
                type: NotificationType.GUARD_ASSISTANCE, recipients: [this.customRecipient], symptom: this.symptom
            }, this.customRecipient);
            n.scheduled = true;
            await nr.save(n);
        }
    }
}

export class MassiveDeliveryNotification extends Notification {
    public customTitle!: string;
    public customBody !: string;

    constructor(title: string, body: string) {
        super();
        this.customTitle = title;
        this.customBody = body;
    }

    public setTitle() {
        this.title = this.customTitle;
    }

    public setBody() {
        this.body = this.customBody;
    }
}

export class WeeklySymptomReportNotification extends Notification {
    constructor() {
        super();
    }

    setTitle() {
        this.title = 'Reporte semanal de síntomas'
    }

    setBody() {
        this.body = 'No olvides completar tu reporte semanal'
    }
}

export class AppointmentReminderNotification extends Notification {
    private appointment!: Appointment;

    constructor(appointment: Appointment) {
        super();
        this.appointment = appointment;
    }

    setTitle() {
        this.title = `Recordatorio de turno - ${this.appointment.title}`
    }

    setBody() {
        let date = createDateWithoutTimezone(String(this.appointment.date))
        this.body = `Recuerde que el dia ${date.toLocaleDateString('es-AR')} a las ${date.toLocaleTimeString('es-AR')} usted tiene un turno con el/la profesional ${this.appointment.User.lastName} ${this.appointment.User.firstName}`;
    }
}

export class ControlWithoutAppointmentNotification extends Notification {
    private control!: Control;

    constructor(control: Control) {
        super();
        this.control = control;
    }

    setTitle() {
        this.title = `Recuerde solicitar un turno para el ${this.control.title.toLocaleLowerCase()}`;
    }

    setBody() {
        this.body = `Usted tiene el ${this.control.title.toLocaleLowerCase()} asignado en las semanas ${this.control.weekFrom}-${this.control.weekTo} que aun no posee un turno asignado.\nComuníquese con el hospital para solicitarlo`;
    }
}

export class GuardAssistanceNotification extends Notification {
    public symptom!: Symptom;

    constructor(symptom: Symptom) {
        super();
        this.symptom = symptom;
    }

    setTitle() {
        this.title = `Confirmación de asistencia a guardia`;
    }

    setBody() {
        this.body = `¿Se acerco a la guardia para revisar el síntoma ${this.symptom.label.toLocaleLowerCase()} reportado el dia anterior?`
    }
}



