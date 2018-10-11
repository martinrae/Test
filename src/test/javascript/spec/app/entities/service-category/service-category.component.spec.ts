/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { YaldayTestModule } from '../../../test.module';
import { ServiceCategoryComponent } from 'app/entities/service-category/service-category.component';
import { ServiceCategoryService } from 'app/entities/service-category/service-category.service';
import { ServiceCategory } from 'app/shared/model/service-category.model';

describe('Component Tests', () => {
    describe('ServiceCategory Management Component', () => {
        let comp: ServiceCategoryComponent;
        let fixture: ComponentFixture<ServiceCategoryComponent>;
        let service: ServiceCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [ServiceCategoryComponent],
                providers: []
            })
                .overrideTemplate(ServiceCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServiceCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ServiceCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.serviceCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
