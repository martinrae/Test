import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from 'app/entities/service';

@Component({
    selector: 'jhi-service-category-update',
    templateUrl: './service-category-update.component.html'
})
export class ServiceCategoryUpdateComponent implements OnInit {
    private _serviceCategory: IServiceCategory;
    isSaving: boolean;

    services: IService[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private serviceCategoryService: ServiceCategoryService,
        private serviceService: ServiceService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ serviceCategory }) => {
            this.serviceCategory = serviceCategory;
        });
        this.serviceService.query().subscribe(
            (res: HttpResponse<IService[]>) => {
                this.services = res.body;
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
        this.dataUtils.clearInputImage(this.serviceCategory, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.serviceCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceCategoryService.update(this.serviceCategory));
        } else {
            this.subscribeToSaveResponse(this.serviceCategoryService.create(this.serviceCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServiceCategory>>) {
        result.subscribe((res: HttpResponse<IServiceCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackServiceById(index: number, item: IService) {
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
    get serviceCategory() {
        return this._serviceCategory;
    }

    set serviceCategory(serviceCategory: IServiceCategory) {
        this._serviceCategory = serviceCategory;
    }
}
