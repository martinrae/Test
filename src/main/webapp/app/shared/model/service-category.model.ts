import { IService } from 'app/shared/model//service.model';

export interface IServiceCategory {
    id?: number;
    name?: string;
    description?: string;
    profileImageContentType?: string;
    profileImage?: any;
    services?: IService[];
}

export class ServiceCategory implements IServiceCategory {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public profileImageContentType?: string,
        public profileImage?: any,
        public services?: IService[]
    ) {}
}
