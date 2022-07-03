export interface GuestDTO {
    active?: boolean;
    alternativePhone?: string;
    birthDate: Date;
    deviceID?: string;
    docType: number;
    email: string;
    firstName: string;
    FUM: Date;
    lastName: string;
    password: string;
    Patient?: any;
    phone?: string;
    role: number[];
    username: string;
}