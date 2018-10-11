import { IImage } from 'app/shared/model//image.model';
import { IServiceCategory } from 'app/shared/model//service-category.model';
import { IResource } from 'app/shared/model//resource.model';
import { IMerchantAccount } from 'app/shared/model//merchant-account.model';
import { IDiscount } from 'app/shared/model//discount.model';

export interface IService {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    profileImageContentType?: string;
    profileImage?: any;
    images?: IImage[];
    serviceCategories?: IServiceCategory[];
    resources?: IResource[];
    merchantAccount?: IMerchantAccount;
    discount?: IDiscount;
}

export class Service implements IService {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number,
        public profileImageContentType?: string,
        public profileImage?: any,
        public images?: IImage[],
        public serviceCategories?: IServiceCategory[],
        public resources?: IResource[],
        public merchantAccount?: IMerchantAccount,
        public discount?: IDiscount
    ) {}
}
