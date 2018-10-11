import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountCategory } from 'app/shared/model/account-category.model';
import { AccountCategoryService } from './account-category.service';
import { AccountCategoryComponent } from './account-category.component';
import { AccountCategoryDetailComponent } from './account-category-detail.component';
import { AccountCategoryUpdateComponent } from './account-category-update.component';
import { AccountCategoryDeletePopupComponent } from './account-category-delete-dialog.component';
import { IAccountCategory } from 'app/shared/model/account-category.model';

@Injectable({ providedIn: 'root' })
export class AccountCategoryResolve implements Resolve<IAccountCategory> {
    constructor(private service: AccountCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accountCategory: HttpResponse<AccountCategory>) => accountCategory.body));
        }
        return of(new AccountCategory());
    }
}

export const accountCategoryRoute: Routes = [
    {
        path: 'account-category',
        component: AccountCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AccountCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-category/:id/view',
        component: AccountCategoryDetailComponent,
        resolve: {
            accountCategory: AccountCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AccountCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-category/new',
        component: AccountCategoryUpdateComponent,
        resolve: {
            accountCategory: AccountCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AccountCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-category/:id/edit',
        component: AccountCategoryUpdateComponent,
        resolve: {
            accountCategory: AccountCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AccountCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountCategoryPopupRoute: Routes = [
    {
        path: 'account-category/:id/delete',
        component: AccountCategoryDeletePopupComponent,
        resolve: {
            accountCategory: AccountCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AccountCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
