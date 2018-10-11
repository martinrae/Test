import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount-update',
    templateUrl: './discount-update.component.html'
})
export class DiscountUpdateComponent implements OnInit {
    private _discount: IDiscount;
    isSaving: boolean;
    dateCreated: string;
    startDateDp: any;
    endDateDp: any;

    constructor(private discountService: DiscountService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ discount }) => {
            this.discount = discount;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.discount.dateCreated = moment(this.dateCreated, DATE_TIME_FORMAT);
        if (this.discount.id !== undefined) {
            this.subscribeToSaveResponse(this.discountService.update(this.discount));
        } else {
            this.subscribeToSaveResponse(this.discountService.create(this.discount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiscount>>) {
        result.subscribe((res: HttpResponse<IDiscount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get discount() {
        return this._discount;
    }

    set discount(discount: IDiscount) {
        this._discount = discount;
        this.dateCreated = moment(discount.dateCreated).format(DATE_TIME_FORMAT);
    }
}
