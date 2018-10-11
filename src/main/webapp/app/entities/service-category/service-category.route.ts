import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryComponent } from './service-category.component';
import { ServiceCategoryDetailComponent } from './service-category-detail.component';
import { ServiceCategoryUpdateComponent } from './service-category-update.component';
import { ServiceCategoryDeletePopupComponent } from './service-category-delete-dialog.component';
import { IServiceCategory } from 'app/shared/model/service-category.model';

@Injectable({ providedIn: 'root' })
export class ServiceCategoryResolve implements Resolve<IServiceCategory> {
    constructor(private service: ServiceCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((serviceCategory: HttpResponse<ServiceCategory>) => serviceCategory.body));
        }
        return of(new ServiceCategory());
    }
}

export const serviceCategoryRoute: Routes = [
    {
        path: 'service-category',
        component: ServiceCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ServiceCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-category/:id/view',
        component: ServiceCategoryDetailComponent,
        resolve: {
            serviceCategory: ServiceCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ServiceCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-category/new',
        component: ServiceCategoryUpdateComponent,
        resolve: {
            serviceCategory: ServiceCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ServiceCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-category/:id/edit',
        component: ServiceCategoryUpdateComponent,
        resolve: {
            serviceCategory: ServiceCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ServiceCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceCategoryPopupRoute: Routes = [
    {
        path: 'service-category/:id/delete',
        component: ServiceCategoryDeletePopupComponent,
        resolve: {
            serviceCategory: ServiceCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ServiceCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
