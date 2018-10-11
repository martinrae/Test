import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import {
    AccountCategoryComponent,
    AccountCategoryDetailComponent,
    AccountCategoryUpdateComponent,
    AccountCategoryDeletePopupComponent,
    AccountCategoryDeleteDialogComponent,
    accountCategoryRoute,
    accountCategoryPopupRoute
} from './';

const ENTITY_STATES = [...accountCategoryRoute, ...accountCategoryPopupRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountCategoryComponent,
        AccountCategoryDetailComponent,
        AccountCategoryUpdateComponent,
        AccountCategoryDeleteDialogComponent,
        AccountCategoryDeletePopupComponent
    ],
    entryComponents: [
        AccountCategoryComponent,
        AccountCategoryUpdateComponent,
        AccountCategoryDeleteDialogComponent,
        AccountCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayAccountCategoryModule {}
