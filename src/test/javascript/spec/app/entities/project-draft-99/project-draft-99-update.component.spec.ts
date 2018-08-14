/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Draft99App1TestModule } from '../../../test.module';
import { ProjectDraft99UpdateComponent } from 'app/entities/project-draft-99/project-draft-99-update.component';
import { ProjectDraft99Service } from 'app/entities/project-draft-99/project-draft-99.service';
import { ProjectDraft99 } from 'app/shared/model/project-draft-99.model';

describe('Component Tests', () => {
    describe('ProjectDraft99 Management Update Component', () => {
        let comp: ProjectDraft99UpdateComponent;
        let fixture: ComponentFixture<ProjectDraft99UpdateComponent>;
        let service: ProjectDraft99Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Draft99App1TestModule],
                declarations: [ProjectDraft99UpdateComponent]
            })
                .overrideTemplate(ProjectDraft99UpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectDraft99UpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectDraft99Service);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectDraft99(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
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
                    const entity = new ProjectDraft99();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
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
