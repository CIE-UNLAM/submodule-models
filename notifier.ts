export interface NotifierDTO {
    title: string;
    body: string;
    previousRisk: number,
    currentRisk: number,
    socialRisk: number,
    gestationalWeekStart: number,
    gestationalWeekEnd: number,
    targetPatientState : number
}

export enum NotificationTargetPatientState {
    VALIDATED = 1,
    NOT_VALIDATED = 0,
    BOTH = 2,
}