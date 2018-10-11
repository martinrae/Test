import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IReview } from 'app/shared/model/review.model';
import { ReviewService } from './review.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';
import { IMerchantAccount } from 'app/shared/model/merchant-account.model';
import { MerchantAccountService } from 'app/entities/merchant-account';

@Component({
    selector: 'jhi-review-update',
    templateUrl: './review-update.component.html'
})
export class ReviewUpdateComponent implements OnInit {
    private _review: IReview;
    isSaving: boolean;

    contacts: IContact[];

    merchantaccounts: IMerchantAccount[];
    reviewDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private reviewService: ReviewService,
        private contactService: ContactService,
        private merchantAccountService: MerchantAccountService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ review }) => {
            this.review = review;
        });
        this.contactService.query().subscribe(
            (res: HttpResponse<IContact[]>) => {
                this.contacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.dataUtils.clearInputImage(this.review, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.review.reviewDate = moment(this.reviewDate, DATE_TIME_FORMAT);
        if (this.review.id !== undefined) {
            this.subscribeToSaveResponse(this.reviewService.update(this.review));
        } else {
            this.subscribeToSaveResponse(this.reviewService.create(this.review));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReview>>) {
        result.subscribe((res: HttpResponse<IReview>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContactById(index: number, item: IContact) {
        return item.id;
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
    get review() {
        return this._review;
    }

    set review(review: IReview) {
        this._review = review;
        this.reviewDate = moment(review.reviewDate).format(DATE_TIME_FORMAT);
    }
}
