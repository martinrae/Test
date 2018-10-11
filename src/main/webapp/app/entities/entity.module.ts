import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { YaldayContactModule } from './contact/contact.module';
import { YaldayMerchantAccountModule } from './merchant-account/merchant-account.module';
import { YaldayAccountCategoryModule } from './account-category/account-category.module';
import { YaldayServiceModule } from './service/service.module';
import { YaldayServiceCategoryModule } from './service-category/service-category.module';
import { YaldayResourceModule } from './resource/resource.module';
import { YaldayBookingModule } from './booking/booking.module';
import { YaldayBillModule } from './bill/bill.module';
import { YaldayReviewModule } from './review/review.module';
import { YaldayImageModule } from './image/image.module';
import { YaldayDiscountModule } from './discount/discount.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        YaldayContactModule,
        YaldayMerchantAccountModule,
        YaldayAccountCategoryModule,
        YaldayServiceModule,
        YaldayServiceCategoryModule,
        YaldayResourceModule,
        YaldayBookingModule,
        YaldayBillModule,
        YaldayReviewModule,
        YaldayImageModule,
        YaldayDiscountModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YaldayEntityModule {}
