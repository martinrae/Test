import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MerchantAccount } from 'app/shared/model/merchant-account.model';
import { MerchantSearchService } from './merchant-search.service';
import { MerchantSearchComponent } from './merchant-search.component';
import { MerchantSearchDetailComponent } from './merchant-search-detail.component';
import { IMerchantAccount } from 'app/shared/model/merchant-account.model';

@Injectable({ providedIn: 'root' })
export class MerchantSearchResolve implements Resolve<IMerchantAccount> {
    constructor(private service: MerchantSearchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((merchantAccount: HttpResponse<MerchantAccount>) => merchantAccount.body));
        }
        return of(new MerchantAccount());
    }
}

export const merchantSearchRoute: Routes = [
    {
        path: 'merchant-search/:id/view',
        component: MerchantSearchDetailComponent,
        resolve: {
            merchantAccount: MerchantSearchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MerchantAccounts'
        },
        canActivate: [UserRouteAccessService]
    }
];
