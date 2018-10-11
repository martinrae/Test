import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IService } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';
import { IServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from 'app/entities/service-category';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource';
import { IMerchantAccount } from 'app/shared/model/merchant-account.model';
import { MerchantAccountService } from 'app/entities/merchant-account';
import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from 'app/entities/discount';

@Component({
    selector: 'jhi-service-update',
    templateUrl: './service-update.component.html'
})
export class ServiceUpdateComponent implements OnInit {
    private _service: IService;
    isSaving: boolean;

    servicecategories: IServiceCategory[];

    resources: IResource[];

    merchantaccounts: IMerchantAccount[];

    discounts: IDiscount[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private serviceService: ServiceService,
        private serviceCategoryService: ServiceCategoryService,
        private resourceService: ResourceService,
        private merchantAccountService: MerchantAccountService,
        private discountService: DiscountService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ service }) => {
            this.service = service;
        });
        this.serviceCategoryService.query().subscribe(
            (res: HttpResponse<IServiceCategory[]>) => {
                this.servicecategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.resourceService.query().subscribe(
            (res: HttpResponse<IResource[]>) => {
                this.resources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.merchantAccountService.query().subscribe(
            (res: HttpResponse<IMerchantAccount[]>) => {
                this.merchantaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.discountService.query().subscribe(
            (res: HttpResponse<IDiscount[]>) => {
                this.discounts = res.body;
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
        this.dataUtils.clearInputImage(this.service, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.service.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceService.update(this.service));
        } else {
            this.subscribeToSaveResponse(this.serviceService.create(this.service));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IService>>) {
        result.subscribe((res: HttpResponse<IService>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackServiceCategoryById(index: number, item: IServiceCategory) {
        return item.id;
    }

    trackResourceById(index: number, item: IResource) {
        return item.id;
    }

    trackMerchantAccountById(index: number, item: IMerchantAccount) {
        return item.id;
    }

    trackDiscountById(index: number, item: IDiscount) {
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
    get service() {
        return this._service;
    }

    set service(service: IService) {
        this._service = service;
    }
}
