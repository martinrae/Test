/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { YaldayTestModule } from '../../../test.module';
import { AccountCategoryDetailComponent } from 'app/entities/account-category/account-category-detail.component';
import { AccountCategory } from 'app/shared/model/account-category.model';

describe('Component Tests', () => {
    describe('AccountCategory Management Detail Component', () => {
        let comp: AccountCategoryDetailComponent;
        let fixture: ComponentFixture<AccountCategoryDetailComponent>;
        const route = ({ data: of({ accountCategory: new AccountCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [AccountCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accountCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
