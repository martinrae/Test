/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YaldayTestModule } from '../../../test.module';
import { ServiceCategoryUpdateComponent } from 'app/entities/service-category/service-category-update.component';
import { ServiceCategoryService } from 'app/entities/service-category/service-category.service';
import { ServiceCategory } from 'app/shared/model/service-category.model';

describe('Component Tests', () => {
    describe('ServiceCategory Management Update Component', () => {
        let comp: ServiceCategoryUpdateComponent;
        let fixture: ComponentFixture<ServiceCategoryUpdateComponent>;
        let service: ServiceCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [ServiceCategoryUpdateComponent]
            })
                .overrideTemplate(ServiceCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServiceCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ServiceCategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.serviceCategory = entity;
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
                    const entity = new ServiceCategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.serviceCategory = entity;
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
