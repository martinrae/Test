import { NgModule } from '@angular/core';

import { YaldaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [YaldaySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [YaldaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class YaldaySharedCommonModule {}
