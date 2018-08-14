/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Draft99App1TestModule } from '../../../test.module';
import { DocumentDraft99DetailComponent } from 'app/entities/document-draft-99/document-draft-99-detail.component';
import { DocumentDraft99 } from 'app/shared/model/document-draft-99.model';

describe('Component Tests', () => {
    describe('DocumentDraft99 Management Detail Component', () => {
        let comp: DocumentDraft99DetailComponent;
        let fixture: ComponentFixture<DocumentDraft99DetailComponent>;
        const route = ({ data: of({ document: new DocumentDraft99(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Draft99App1TestModule],
                declarations: [DocumentDraft99DetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentDraft99DetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentDraft99DetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.document).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
