import { IMerchantAccount } from 'app/shared/model//merchant-account.model';

export interface IAccountCategory {
    id?: number;
    name?: string;
    description?: string;
    profileImageContentType?: string;
    profileImage?: any;
    merchantAccounts?: IMerchantAccount[];
}

export class AccountCategory implements IAccountCategory {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public profileImageContentType?: string,
        public profileImage?: any,
        public merchantAccounts?: IMerchantAccount[]
    ) {}
}
