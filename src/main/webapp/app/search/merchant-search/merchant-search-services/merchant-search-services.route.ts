import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from 'app/shared/model/service.model';
import { MerchantSearchServicesService } from './merchant-search-services.service';
import { MerchantSearchServicesComponent } from './merchant-search-services.component';
import { IService } from 'app/shared/model/service.model';

@Injectable({ providedIn: 'root' })
export class MerchantSearchServiceResolve implements Resolve<IService> {
    constructor(private service: MerchantSearchServicesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((service: HttpResponse<Service>) => service.body));
        }
        return of(new Service());
    }
}

export const merchantSearchServiceRoute: Routes = [
    {
        path: 'service',
        component: MerchantSearchServicesComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Services'
        },
        canActivate: [UserRouteAccessService]
    }
];
