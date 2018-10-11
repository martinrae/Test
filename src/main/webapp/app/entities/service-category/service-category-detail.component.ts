import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IServiceCategory } from 'app/shared/model/service-category.model';

@Component({
    selector: 'jhi-service-category-detail',
    templateUrl: './service-category-detail.component.html'
})
export class ServiceCategoryDetailComponent implements OnInit {
    serviceCategory: IServiceCategory;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ serviceCategory }) => {
            this.serviceCategory = serviceCategory;
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
