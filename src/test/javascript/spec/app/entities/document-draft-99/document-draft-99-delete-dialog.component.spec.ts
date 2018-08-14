/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Draft99App1TestModule } from '../../../test.module';
import { DocumentDraft99DeleteDialogComponent } from 'app/entities/document-draft-99/document-draft-99-delete-dialog.component';
import { DocumentDraft99Service } from 'app/entities/document-draft-99/document-draft-99.service';

describe('Component Tests', () => {
    describe('DocumentDraft99 Management Delete Component', () => {
        let comp: DocumentDraft99DeleteDialogComponent;
        let fixture: ComponentFixture<DocumentDraft99DeleteDialogComponent>;
        let service: DocumentDraft99Service;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Draft99App1TestModule],
                declarations: [DocumentDraft99DeleteDialogComponent]
            })
                .overrideTemplate(DocumentDraft99DeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentDraft99DeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentDraft99Service);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
