import { Moment } from 'moment';
import { IImage } from 'app/shared/model//image.model';
import { IContact } from 'app/shared/model//contact.model';
import { IMerchantAccount } from 'app/shared/model//merchant-account.model';

export interface IReview {
    id?: number;
    name?: string;
    rating?: number;
    description?: string;
    reviewDate?: Moment;
    profileImageContentType?: string;
    profileImage?: any;
    images?: IImage[];
    contacts?: IContact[];
    merchantAccounts?: IMerchantAccount[];
}

export class Review implements IReview {
    constructor(
        public id?: number,
        public name?: string,
        public rating?: number,
        public description?: string,
        public reviewDate?: Moment,
        public profileImageContentType?: string,
        public profileImage?: any,
        public images?: IImage[],
        public contacts?: IContact[],
        public merchantAccounts?: IMerchantAccount[]
    ) {}
}
