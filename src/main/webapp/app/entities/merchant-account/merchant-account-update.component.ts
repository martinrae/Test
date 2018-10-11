import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMerchantAccount } from 'app/shared/model/merchant-account.model';
import { MerchantAccountService } from './merchant-account.service';
import { IAccountCategory } from 'app/shared/model/account-category.model';
import { AccountCategoryService } from 'app/entities/account-category';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';
import { IReview } from 'app/shared/model/review.model';
import { ReviewService } from 'app/entities/review';

@Component({
    selector: 'jhi-merchant-account-update',
    templateUrl: './merchant-account-update.component.html'
})
export class MerchantAccountUpdateComponent implements OnInit {
    private _merchantAccount: IMerchantAccount;
    isSaving: boolean;

    accountcategories: IAccountCategory[];

    contacts: IContact[];

    reviews: IReview[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private merchantAccountService: MerchantAccountService,
        private accountCategoryService: AccountCategoryService,
        private contactService: ContactService,
        private reviewService: ReviewService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ merchantAccount }) => {
            this.merchantAccount = merchantAccount;
        });
        this.accountCategoryService.query().subscribe(
            (res: HttpResponse<IAccountCategory[]>) => {
                this.accountcategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.contactService.query().subscribe(
            (res: HttpResponse<IContact[]>) => {
                this.contacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.reviewService.query().subscribe(
            (res: HttpResponse<IReview[]>) => {
                this.reviews = res.body;
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
        this.dataUtils.clearInputImage(this.merchantAccount, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.merchantAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.merchantAccountService.update(this.merchantAccount));
        } else {
            this.subscribeToSaveResponse(this.merchantAccountService.create(this.merchantAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMerchantAccount>>) {
        result.subscribe((res: HttpResponse<IMerchantAccount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAccountCategoryById(index: number, item: IAccountCategory) {
        return item.id;
    }

    trackContactById(index: number, item: IContact) {
        return item.id;
    }

    trackReviewById(index: number, item: IReview) {
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
    get merchantAccount() {
        return this._merchantAccount;
    }

    set merchantAccount(merchantAccount: IMerchantAccount) {
        this._merchantAccount = merchantAccount;
    }
}
