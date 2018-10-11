import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IImage } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';
import { IReview } from 'app/shared/model/review.model';
import { ReviewService } from 'app/entities/review';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from 'app/entities/service';
import { IMerchantAccount } from 'app/shared/model/merchant-account.model';
import { MerchantAccountService } from 'app/entities/merchant-account';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource';

@Component({
    selector: 'jhi-image-update',
    templateUrl: './image-update.component.html'
})
export class ImageUpdateComponent implements OnInit {
    private _image: IImage;
    isSaving: boolean;

    contacts: IContact[];

    reviews: IReview[];

    services: IService[];

    merchantaccounts: IMerchantAccount[];

    resources: IResource[];
    dateCreated: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private imageService: ImageService,
        private contactService: ContactService,
        private reviewService: ReviewService,
        private serviceService: ServiceService,
        private merchantAccountService: MerchantAccountService,
        private resourceService: ResourceService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ image }) => {
            this.image = image;
        });
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
        this.serviceService.query().subscribe(
            (res: HttpResponse<IService[]>) => {
                this.services = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.merchantAccountService.query().subscribe(
            (res: HttpResponse<IMerchantAccount[]>) => {
                this.merchantaccounts = res.body;
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
        this.dataUtils.clearInputImage(this.image, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.image.dateCreated = moment(this.dateCreated, DATE_TIME_FORMAT);
        if (this.image.id !== undefined) {
            this.subscribeToSaveResponse(this.imageService.update(this.image));
        } else {
            this.subscribeToSaveResponse(this.imageService.create(this.image));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>) {
        result.subscribe((res: HttpResponse<IImage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReviewById(index: number, item: IReview) {
        return item.id;
    }

    trackServiceById(index: number, item: IService) {
        return item.id;
    }

    trackMerchantAccountById(index: number, item: IMerchantAccount) {
        return item.id;
    }

    trackResourceById(index: number, item: IResource) {
        return item.id;
    }
    get image() {
        return this._image;
    }

    set image(image: IImage) {
        this._image = image;
        this.dateCreated = moment(image.dateCreated).format(DATE_TIME_FORMAT);
    }
}
