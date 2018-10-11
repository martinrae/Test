/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { YaldayTestModule } from '../../../test.module';
import { AccountCategoryComponent } from 'app/entities/account-category/account-category.component';
import { AccountCategoryService } from 'app/entities/account-category/account-category.service';
import { AccountCategory } from 'app/shared/model/account-category.model';

describe('Component Tests', () => {
    describe('AccountCategory Management Component', () => {
        let comp: AccountCategoryComponent;
        let fixture: ComponentFixture<AccountCategoryComponent>;
        let service: AccountCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [AccountCategoryComponent],
                providers: []
            })
                .overrideTemplate(AccountCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accountCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
