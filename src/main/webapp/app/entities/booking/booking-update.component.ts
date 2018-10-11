import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IBooking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { IBill } from 'app/shared/model/bill.model';
import { BillService } from 'app/entities/bill';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource';

@Component({
    selector: 'jhi-booking-update',
    templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
    private _booking: IBooking;
    isSaving: boolean;

    bills: IBill[];

    resources: IResource[];
    placedDate: string;
    startTimeDp: any;
    endTimeDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private billService: BillService,
        private resourceService: ResourceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = booking;
        });
        this.billService.query({ filter: 'booking-is-null' }).subscribe(
            (res: HttpResponse<IBill[]>) => {
                if (!this.booking.bill || !this.booking.bill.id) {
                    this.bills = res.body;
                } else {
                    this.billService.find(this.booking.bill.id).subscribe(
                        (subRes: HttpResponse<IBill>) => {
                            this.bills = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.resourceService.query().subscribe(
            (res: HttpResponse<IResource[]>) => {
                this.resources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.booking.placedDate = moment(this.placedDate, DATE_TIME_FORMAT);
        if (this.booking.id !== undefined) {
            this.subscribeToSaveResponse(this.bookingService.update(this.booking));
        } else {
            this.subscribeToSaveResponse(this.bookingService.create(this.booking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>) {
        result.subscribe((res: HttpResponse<IBooking>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBillById(index: number, item: IBill) {
        return item.id;
    }

    trackResourceById(index: number, item: IResource) {
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
    get booking() {
        return this._booking;
    }

    set booking(booking: IBooking) {
        this._booking = booking;
        this.placedDate = moment(booking.placedDate).format(DATE_TIME_FORMAT);
    }
}
