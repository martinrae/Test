import { Moment } from 'moment';
import { IService } from 'app/shared/model//service.model';

export interface IDiscount {
    id?: number;
    name?: string;
    dateCreated?: Moment;
    percentatge?: number;
    startDate?: Moment;
    endDate?: Moment;
    services?: IService[];
}

export class Discount implements IDiscount {
    constructor(
        public id?: number,
        public name?: string,
        public dateCreated?: Moment,
        public percentatge?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public services?: IService[]
    ) {}
}
