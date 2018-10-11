/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { YaldayTestModule } from '../../../test.module';
import { BillComponent } from 'app/entities/bill/bill.component';
import { BillService } from 'app/entities/bill/bill.service';
import { Bill } from 'app/shared/model/bill.model';

describe('Component Tests', () => {
    describe('Bill Management Component', () => {
        let comp: BillComponent;
        let fixture: ComponentFixture<BillComponent>;
        let service: BillService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YaldayTestModule],
                declarations: [BillComponent],
                providers: []
            })
                .overrideTemplate(BillComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BillComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Bill(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
