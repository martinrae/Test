import { Moment } from 'moment';
import { IContact } from 'app/shared/model//contact.model';
import { IReview } from 'app/shared/model//review.model';
import { IService } from 'app/shared/model//service.model';
import { IMerchantAccount } from 'app/shared/model//merchant-account.model';
import { IResource } from 'app/shared/model//resource.model';

export interface IImage {
    id?: number;
    dateCreated?: Moment;
    description?: string;
    tag?: string;
    imageContentType?: string;
    image?: any;
    contact?: IContact;
    review?: IReview;
    service?: IService;
    merchantAccount?: IMerchantAccount;
    resource?: IResource;
}

export class Image implements IImage {
    constructor(
        public id?: number,
        public dateCreated?: Moment,
        public description?: string,
        public tag?: string,
        public imageContentType?: string,
        public image?: any,
        public contact?: IContact,
        public review?: IReview,
        public service?: IService,
        public merchantAccount?: IMerchantAccount,
        public resource?: IResource
    ) {}
}
