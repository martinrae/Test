import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';

@Component({
    selector: 'jhi-service-category-delete-dialog',
    templateUrl: './service-category-delete-dialog.component.html'
})
export class ServiceCategoryDeleteDialogComponent {
    serviceCategory: IServiceCategory;

    constructor(
        private serviceCategoryService: ServiceCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'serviceCategoryListModification',
                content: 'Deleted an serviceCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-category-delete-popup',
    template: ''
})
export class ServiceCategoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ serviceCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ServiceCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.serviceCategory = serviceCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
