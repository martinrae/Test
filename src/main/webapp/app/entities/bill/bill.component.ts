import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBill } from 'app/shared/model/bill.model';
import { Principal } from 'app/core';
import { BillService } from './bill.service';

@Component({
    selector: 'jhi-bill',
    templateUrl: './bill.component.html'
})
export class BillComponent implements OnInit, OnDestroy {
    bills: IBill[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private billService: BillService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.billService
                .search({
                    query: this.currentSearch
                })
                .subscribe((res: HttpResponse<IBill[]>) => (this.bills = res.body), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.billService.query().subscribe(
            (res: HttpResponse<IBill[]>) => {
                this.bills = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBill) {
        return item.id;
    }

    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe('billListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
