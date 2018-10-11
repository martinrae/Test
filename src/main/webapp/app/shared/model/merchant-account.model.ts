import { IService } from 'app/shared/model//service.model';
import { IImage } from 'app/shared/model//image.model';
import { IAccountCategory } from 'app/shared/model//account-category.model';
import { IContact } from 'app/shared/model//contact.model';
import { IReview } from 'app/shared/model//review.model';

export interface IMerchantAccount {
    id?: number;
    name?: string;
    description?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
    profileImageContentType?: string;
    profileImage?: any;
    openMonday?: boolean;
    openTuesday?: boolean;
    openWednesday?: boolean;
    openThursday?: boolean;
    openFriday?: boolean;
    openSaturday?: boolean;
    openSunday?: boolean;
    services?: IService[];
    images?: IImage[];
    accountCategories?: IAccountCategory[];
    contacts?: IContact[];
    reviews?: IReview[];
}

export class MerchantAccount implements IMerchantAccount {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public profileImageContentType?: string,
        public profileImage?: any,
        public openMonday?: boolean,
        public openTuesday?: boolean,
        public openWednesday?: boolean,
        public openThursday?: boolean,
        public openFriday?: boolean,
        public openSaturday?: boolean,
        public openSunday?: boolean,
        public services?: IService[],
        public images?: IImage[],
        public accountCategories?: IAccountCategory[],
        public contacts?: IContact[],
        public reviews?: IReview[]
    ) {
        this.openMonday = this.openMonday || false;
        this.openTuesday = this.openTuesday || false;
        this.openWednesday = this.openWednesday || false;
        this.openThursday = this.openThursday || false;
        this.openFriday = this.openFriday || false;
        this.openSaturday = this.openSaturday || false;
        this.openSunday = this.openSunday || false;
    }
}
