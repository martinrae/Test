import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAccountCategory } from 'app/shared/model/account-category.model';

@Component({
    selector: 'jhi-account-category-detail',
    templateUrl: './account-category-detail.component.html'
})
export class AccountCategoryDetailComponent implements OnInit {
    accountCategory: IAccountCategory;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountCategory }) => {
            this.accountCategory = accountCategory;
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
