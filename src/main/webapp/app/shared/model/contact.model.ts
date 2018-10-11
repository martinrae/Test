import { IUser } from 'app/core/user/user.model';
import { IImage } from 'app/shared/model//image.model';
import { IMerchantAccount } from 'app/shared/model//merchant-account.model';
import { IReview } from 'app/shared/model//review.model';

export const enum Type {
    CUSTOMER = 'CUSTOMER',
    MERCHANT = 'MERCHANT'
}

export interface IContact {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
    type?: Type;
    profileImageContentType?: string;
    profileImage?: any;
    emailConsent?: boolean;
    user?: IUser;
    images?: IImage[];
    merchantAccounts?: IMerchantAccount[];
    reviews?: IReview[];
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public username?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public type?: Type,
        public profileImageContentType?: string,
        public profileImage?: any,
        public emailConsent?: boolean,
        public user?: IUser,
        public images?: IImage[],
        public merchantAccounts?: IMerchantAccount[],
        public reviews?: IReview[]
    ) {
        this.emailConsent = this.emailConsent || false;
    }
}
