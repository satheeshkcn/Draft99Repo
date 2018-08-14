/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Draft99App1TestModule } from '../../../test.module';
import { DocumentDraft99UpdateComponent } from 'app/entities/document-draft-99/document-draft-99-update.component';
import { DocumentDraft99Service } from 'app/entities/document-draft-99/document-draft-99.service';
import { DocumentDraft99 } from 'app/shared/model/document-draft-99.model';

describe('Component Tests', () => {
    describe('DocumentDraft99 Management Update Component', () => {
        let comp: DocumentDraft99UpdateComponent;
        let fixture: ComponentFixture<DocumentDraft99UpdateComponent>;
        let service: DocumentDraft99Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Draft99App1TestModule],
                declarations: [DocumentDraft99UpdateComponent]
            })
                .overrideTemplate(DocumentDraft99UpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentDraft99UpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentDraft99Service);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentDraft99(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.document = entity;
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
                    const entity = new DocumentDraft99();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.document = entity;
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
