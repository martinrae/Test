import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBill } from 'app/shared/model/bill.model';

@Component({
    selector: 'jhi-bill-detail',
    templateUrl: './bill-detail.component.html'
})
export class BillDetailComponent implements OnInit {
    bill: IBill;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bill }) => {
            this.bill = bill;
        });
    }

    previousState() {
        window.history.back();
    }
}
