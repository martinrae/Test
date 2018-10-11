import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAccountCategory } from 'app/shared/model/account-category.model';
import { AccountCategoryService } from './account-category.service';
import { IMerchantAccount } from 'app/shared/model/merchant-account.model';
import { MerchantAccountService } from 'app/entities/merchant-account';

@Component({
    selector: 'jhi-account-category-update',
    templateUrl: './account-category-update.component.html'
})
export class AccountCategoryUpdateComponent implements OnInit {
    private _accountCategory: IAccountCategory;
    isSaving: boolean;

    merchantaccounts: IMerchantAccount[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private accountCategoryService: AccountCategoryService,
        private merchantAccountService: MerchantAccountService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountCategory }) => {
            this.accountCategory = accountCategory;
        });
        this.merchantAccountService.query().subscribe(
            (res: HttpResponse<IMerchantAccount[]>) => {
                this.merchantaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.accountCategory, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accountCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.accountCategoryService.update(this.accountCategory));
        } else {
            this.subscribeToSaveResponse(this.accountCategoryService.create(this.accountCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountCategory>>) {
        result.subscribe((res: HttpResponse<IAccountCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMerchantAccountById(index: number, item: IMerchantAccount) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get accountCategory() {
        return this._accountCategory;
    }

    set accountCategory(accountCategory: IAccountCategory) {
        this._accountCategory = accountCategory;
    }
}
