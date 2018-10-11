import { Moment } from 'moment';
import { IBooking } from 'app/shared/model//booking.model';

export const enum BillStatus {
    PAID = 'PAID',
    ISSUED = 'ISSUED',
    CANCELLED = 'CANCELLED'
}

export const enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    CASH_ON_DELIVERY = 'CASH_ON_DELIVERY'
}

export interface IBill {
    id?: number;
    date?: Moment;
    details?: string;
    code?: string;
    billStatus?: BillStatus;
    paymentMethod?: PaymentMethod;
    paymentAmount?: number;
    booking?: IBooking;
}

export class Bill implements IBill {
    constructor(
        public id?: number,
        public date?: Moment,
        public details?: string,
        public code?: string,
        public billStatus?: BillStatus,
        public paymentMethod?: PaymentMethod,
        public paymentAmount?: number,
        public booking?: IBooking
    ) {}
}
