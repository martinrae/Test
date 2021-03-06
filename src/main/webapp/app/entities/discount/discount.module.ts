import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import {
    DiscountComponent,
    DiscountDetailComponent,
    DiscountUpdateComponent,
    DiscountDeletePopupComponent,
    DiscountDeleteDialogComponent,
    discountRoute,
    discountPopupRoute
} from './';

const ENTITY_STATES = [...discountRoute, ...discountPopupRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiscountComponent,
        DiscountDetailComponent,
        DiscountUpdateComponent,
        DiscountDeleteDialogComponent,
        DiscountDeletePopupComponent
    ],
    entryComponents: [DiscountComponent, DiscountUpdateComponent, DiscountDeleteDialogComponent, DiscountDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayDiscountModule {}
