import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { AgmCoreModule } from '@agm/core';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { YaldaySharedModule } from 'app/shared';
import { YaldayCoreModule } from 'app/core';
import { YaldayAppRoutingModule } from './app-routing.module';
import { YaldayHomeModule } from './home/home.module';
import { YaldayAccountModule } from './account/account.module';
import { YaldayEntityModule } from './entities/entity.module';
import { YaldayMerchantAccountModule } from './entities/merchant-account/';
import { YaldayMerchantSearchModule } from './search/merchant-search/';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        YaldayAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        YaldaySharedModule,
        YaldayCoreModule,
        YaldayHomeModule,
        YaldayAccountModule,
        YaldayEntityModule,
        YaldayMerchantAccountModule,
        YaldayMerchantSearchModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAuzD8ApARFFgqqk5TD5laCAw6PnjDMxbw'
        })
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class YaldayAppModule {}
