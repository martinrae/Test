import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import { YaldayMerchantAccountModule } from 'app/entities/merchant-account';
import { YaldayMerchantSearchModule } from 'app/search/merchant-search';
import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [YaldaySharedModule, YaldayMerchantAccountModule, YaldayMerchantSearchModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayHomeModule {}
