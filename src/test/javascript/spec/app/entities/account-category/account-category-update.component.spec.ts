/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YaldayTestModule } from '../../../test.module';
import { AccountCategoryUpdateComponent } from 'app/entities/account-category/account-category-update.component';
import { AccountCategoryService } from 'app/entities/account-category/account-category.service';
import { AccountCategory } from 'app/shared/model/account-category.model';

describe('Component Tests', () => {
    describe('AccountCategory Management Update Component', () => {
        let comp: AccountCategoryUpdateComponent;
        let fixture: ComponentFixture<AccountCategoryUpdateComponent>;
        let service: AccountCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [AccountCategoryUpdateComponent]
            })
                .overrideTemplate(AccountCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountCategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountCategory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountCategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountCategory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
