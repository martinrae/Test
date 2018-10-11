import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IBill } from 'app/shared/model/bill.model';
import { BillService } from './bill.service';
import { IBooking } from 'app/shared/model/booking.model';
import { BookingService } from 'app/entities/booking';

@Component({
    selector: 'jhi-bill-update',
    templateUrl: './bill-update.component.html'
})
export class BillUpdateComponent implements OnInit {
    private _bill: IBill;
    isSaving: boolean;

    bookings: IBooking[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private billService: BillService,
        private bookingService: BookingService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bill }) => {
            this.bill = bill;
        });
        this.bookingService.query().subscribe(
            (res: HttpResponse<IBooking[]>) => {
                this.bookings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.bill.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(this.billService.create(this.bill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBill>>) {
        result.subscribe((res: HttpResponse<IBill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBookingById(index: number, item: IBooking) {
        return item.id;
    }
    get bill() {
        return this._bill;
    }

    set bill(bill: IBill) {
        this._bill = bill;
        this.date = moment(bill.date).format(DATE_TIME_FORMAT);
    }
}
