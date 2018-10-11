import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMerchantAccount } from 'app/shared/model/merchant-account.model';

@Component({
    selector: 'jhi-merchant-account-detail',
    templateUrl: './merchant-account-detail.component.html'
})
export class MerchantAccountDetailComponent implements OnInit {
    merchantAccount: IMerchantAccount;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ merchantAccount }) => {
            this.merchantAccount = merchantAccount;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
