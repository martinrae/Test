import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { YaldaySharedModule } from 'app/shared';
import { MerchantSearchServicesModule } from './merchant-search-services/merchant-search-services.module';
import { MerchantSearchComponent, MerchantSearchDetailComponent, merchantSearchRoute } from './';

const ENTITY_STATES = [...merchantSearchRoute];

@NgModule({
    imports: [
        YaldaySharedModule,
        MerchantSearchServicesModule,
        RouterModule.forChild(ENTITY_STATES),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAuzD8ApARFFgqqk5TD5laCAw6PnjDMxbw'
        })
    ],
    declarations: [MerchantSearchComponent, MerchantSearchDetailComponent],
    entryComponents: [MerchantSearchComponent, MerchantSearchDetailComponent],
    exports: [MerchantSearchComponent, MerchantSearchDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayMerchantSearchModule {}
