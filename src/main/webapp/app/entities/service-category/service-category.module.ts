import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import {
    ServiceCategoryComponent,
    ServiceCategoryDetailComponent,
    ServiceCategoryUpdateComponent,
    ServiceCategoryDeletePopupComponent,
    ServiceCategoryDeleteDialogComponent,
    serviceCategoryRoute,
    serviceCategoryPopupRoute
} from './';

const ENTITY_STATES = [...serviceCategoryRoute, ...serviceCategoryPopupRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServiceCategoryComponent,
        ServiceCategoryDetailComponent,
        ServiceCategoryUpdateComponent,
        ServiceCategoryDeleteDialogComponent,
        ServiceCategoryDeletePopupComponent
    ],
    entryComponents: [
        ServiceCategoryComponent,
        ServiceCategoryUpdateComponent,
        ServiceCategoryDeleteDialogComponent,
        ServiceCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayServiceCategoryModule {}
