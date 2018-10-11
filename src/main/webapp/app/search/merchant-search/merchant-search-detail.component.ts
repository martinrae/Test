import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMerchantAccount } from 'app/shared/model/merchant-account.model';

@Component({
    selector: 'jhi-merchant-search-detail',
    templateUrl: './merchant-search-detail.component.html',
    styleUrls: ['./merchant-search-detail.component.css']
})
export class MerchantSearchDetailComponent implements OnInit {
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
