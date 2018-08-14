/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Draft99App1TestModule } from '../../../test.module';
import { ProjectDraft99DetailComponent } from 'app/entities/project-draft-99/project-draft-99-detail.component';
import { ProjectDraft99 } from 'app/shared/model/project-draft-99.model';

describe('Component Tests', () => {
    describe('ProjectDraft99 Management Detail Component', () => {
        let comp: ProjectDraft99DetailComponent;
        let fixture: ComponentFixture<ProjectDraft99DetailComponent>;
        const route = ({ data: of({ project: new ProjectDraft99(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Draft99App1TestModule],
                declarations: [ProjectDraft99DetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProjectDraft99DetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectDraft99DetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.project).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
