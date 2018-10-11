import { Moment } from 'moment';
import { IBill } from 'app/shared/model//bill.model';
import { IResource } from 'app/shared/model//resource.model';

export const enum BookingStatus {
    COMPLETED = 'COMPLETED',
    UPCOMING = 'UPCOMING',
    INPROGRESS = 'INPROGRESS',
    CANCELLED = 'CANCELLED'
}

export interface IBooking {
    id?: number;
    placedDate?: Moment;
    status?: BookingStatus;
    code?: string;
    startTime?: Moment;
    endTime?: Moment;
    quantity?: number;
    bill?: IBill;
    resources?: IResource[];
}

export class Booking implements IBooking {
    constructor(
        public id?: number,
        public placedDate?: Moment,
        public status?: BookingStatus,
        public code?: string,
        public startTime?: Moment,
        public endTime?: Moment,
        public quantity?: number,
        public bill?: IBill,
        public resources?: IResource[]
    ) {}
}
