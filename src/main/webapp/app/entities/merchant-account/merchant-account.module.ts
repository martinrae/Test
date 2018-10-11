import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import {
    MerchantAccountComponent,
    MerchantAccountDetailComponent,
    MerchantAccountUpdateComponent,
    MerchantAccountDeletePopupComponent,
    MerchantAccountDeleteDialogComponent,
    merchantAccountRoute,
    merchantAccountPopupRoute
} from './';

const ENTITY_STATES = [...merchantAccountRoute, ...merchantAccountPopupRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MerchantAccountComponent,
        MerchantAccountDetailComponent,
        MerchantAccountUpdateComponent,
        MerchantAccountDeleteDialogComponent,
        MerchantAccountDeletePopupComponent
    ],
    entryComponents: [
        MerchantAccountComponent,
        MerchantAccountUpdateComponent,
        MerchantAccountDeleteDialogComponent,
        MerchantAccountDeletePopupComponent
    ],
    exports: [MerchantAccountComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayMerchantAccountModule {}
