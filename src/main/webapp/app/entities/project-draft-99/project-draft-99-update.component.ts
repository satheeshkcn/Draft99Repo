import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IProjectDraft99 } from 'app/shared/model/project-draft-99.model';
import { ProjectDraft99Service } from './project-draft-99.service';

@Component({
    selector: 'jhi-project-draft-99-update',
    templateUrl: './project-draft-99-update.component.html'
})
export class ProjectDraft99UpdateComponent implements OnInit {
    private _project: IProjectDraft99;
    isSaving: boolean;
    createdDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private projectService: ProjectDraft99Service,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.project, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.project.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(this.projectService.update(this.project));
        } else {
            this.subscribeToSaveResponse(this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProjectDraft99>>) {
        result.subscribe((res: HttpResponse<IProjectDraft99>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get project() {
        return this._project;
    }

    set project(project: IProjectDraft99) {
        this._project = project;
        this.createdDate = moment(project.createdDate).format(DATE_TIME_FORMAT);
    }
}
