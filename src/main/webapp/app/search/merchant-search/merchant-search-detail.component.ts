import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';
import { AgmCoreModule } from '@agm/core';
import { MerchantSearchServicesModule } from './merchant-search-services/merchant-search-services.module';

import { IMerchantAccount } from 'app/shared/model/merchant-account.model';

@Component({
    selector: 'jhi-merchant-search-detail',
    templateUrl: './merchant-search-detail.component.html',
    styleUrls: ['./merchant-search-detail.component.css']
})
export class MerchantSearchDetailComponent implements OnInit {
    merchantAccount: IMerchantAccount;
    longitude;
    latitude;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ merchantAccount }) => {
            this.merchantAccount = merchantAccount;
            console.log(this.merchantAccount);
            this.longitude = -4.2941187; // change to merchants
            this.latitude = 55.8747511; // change to merchants
        });
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
