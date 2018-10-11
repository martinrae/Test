import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import { MerchantSearchComponent, MerchantSearchDetailComponent, merchantSearchRoute } from './';

const ENTITY_STATES = [...merchantSearchRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MerchantSearchComponent, MerchantSearchDetailComponent],
    entryComponents: [MerchantSearchComponent, MerchantSearchDetailComponent],
    exports: [MerchantSearchComponent, MerchantSearchDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayMerchantSearchModule {}
