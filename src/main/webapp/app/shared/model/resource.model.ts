import { IImage } from 'app/shared/model//image.model';
import { IBooking } from 'app/shared/model//booking.model';
import { IService } from 'app/shared/model//service.model';

export interface IResource {
    id?: number;
    name?: string;
    description?: string;
    quantity?: number;
    images?: IImage[];
    bookings?: IBooking[];
    services?: IService[];
}

export class Resource implements IResource {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public quantity?: number,
        public images?: IImage[],
        public bookings?: IBooking[],
        public services?: IService[]
    ) {}
}
