/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Draft99App1TestModule } from '../../../test.module';
import { ProjectDraft99DeleteDialogComponent } from 'app/entities/project-draft-99/project-draft-99-delete-dialog.component';
import { ProjectDraft99Service } from 'app/entities/project-draft-99/project-draft-99.service';

describe('Component Tests', () => {
    describe('ProjectDraft99 Management Delete Component', () => {
        let comp: ProjectDraft99DeleteDialogComponent;
        let fixture: ComponentFixture<ProjectDraft99DeleteDialogComponent>;
        let service: ProjectDraft99Service;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Draft99App1TestModule],
                declarations: [ProjectDraft99DeleteDialogComponent]
            })
                .overrideTemplate(ProjectDraft99DeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectDraft99DeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectDraft99Service);
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
