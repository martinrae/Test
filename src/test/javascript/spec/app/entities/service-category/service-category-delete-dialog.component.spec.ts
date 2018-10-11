/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { YaldayTestModule } from '../../../test.module';
import { ServiceCategoryDeleteDialogComponent } from 'app/entities/service-category/service-category-delete-dialog.component';
import { ServiceCategoryService } from 'app/entities/service-category/service-category.service';

describe('Component Tests', () => {
    describe('ServiceCategory Management Delete Component', () => {
        let comp: ServiceCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceCategoryDeleteDialogComponent>;
        let service: ServiceCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [ServiceCategoryDeleteDialogComponent]
            })
                .overrideTemplate(ServiceCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServiceCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
