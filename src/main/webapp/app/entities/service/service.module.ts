import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YaldaySharedModule } from 'app/shared';
import {
    ServiceComponent,
    ServiceDetailComponent,
    ServiceUpdateComponent,
    ServiceDeletePopupComponent,
    ServiceDeleteDialogComponent,
    serviceRoute,
    servicePopupRoute
} from './';

const ENTITY_STATES = [...serviceRoute, ...servicePopupRoute];

@NgModule({
    imports: [YaldaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServiceComponent,
        ServiceDetailComponent,
        ServiceUpdateComponent,
        ServiceDeleteDialogComponent,
        ServiceDeletePopupComponent
    ],
    entryComponents: [ServiceComponent, ServiceUpdateComponent, ServiceDeleteDialogComponent, ServiceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayServiceModule {}
