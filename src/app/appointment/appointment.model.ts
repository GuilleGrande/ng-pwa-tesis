export class Appointment {
    id?: string;
    userId: string;
    carId: string;
    serviceId: string;
    startDate: Date;
    startTime: string;
    finishDate: Date;
    finishTime: string;
    status: string;
}
