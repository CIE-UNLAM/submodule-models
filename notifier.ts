export interface NotifierDTO {
    title: string;
    body: string;
    previousRisk: number,
    currentRisk: number,
    socialRisk: number,
    gestationalWeekStart: number,
    gestationalWeekEnd: number,
    targetPatientState : NotificationTargetPatientState
}

export enum NotificationTargetPatientState {
    ACTIVE = 1,
    NOT_ACTIVE = 0,
    BOTH = -1,
}