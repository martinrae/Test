import { serviceRoute, servicePopupRoute } from '../../../entities/service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import { MerchantSearchServicesComponent, MerchantSearchServiceResolve } from './';

const ENTITY_STATES = [...merchantSearchServiceRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MerchantSearchServicesComponent],
    exports: [MerchantSearchServicesComponent],
    entryComponents: [MerchantSearchServicesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MerchantSearchServicesModule {}
