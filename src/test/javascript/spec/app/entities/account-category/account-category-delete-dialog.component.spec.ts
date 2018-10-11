/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { YaldayTestModule } from '../../../test.module';
import { AccountCategoryDeleteDialogComponent } from 'app/entities/account-category/account-category-delete-dialog.component';
import { AccountCategoryService } from 'app/entities/account-category/account-category.service';

describe('Component Tests', () => {
    describe('AccountCategory Management Delete Component', () => {
        let comp: AccountCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<AccountCategoryDeleteDialogComponent>;
        let service: AccountCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [AccountCategoryDeleteDialogComponent]
            })
                .overrideTemplate(AccountCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCategoryService);
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
