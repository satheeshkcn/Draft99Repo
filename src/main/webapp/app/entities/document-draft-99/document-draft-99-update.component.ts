import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDocumentDraft99 } from 'app/shared/model/document-draft-99.model';
import { DocumentDraft99Service } from './document-draft-99.service';
import { IProjectDraft99 } from 'app/shared/model/project-draft-99.model';
import { ProjectDraft99Service } from 'app/entities/project-draft-99';

@Component({
    selector: 'jhi-document-draft-99-update',
    templateUrl: './document-draft-99-update.component.html'
})
export class DocumentDraft99UpdateComponent implements OnInit {
    private _document: IDocumentDraft99;
    isSaving: boolean;

    projects: IProjectDraft99[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentDraft99Service,
        private projectService: ProjectDraft99Service,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
        this.projectService.query().subscribe(
            (res: HttpResponse<IProjectDraft99[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentDraft99>>) {
        result.subscribe((res: HttpResponse<IDocumentDraft99>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProjectById(index: number, item: IProjectDraft99) {
        return item.id;
    }
    get document() {
        return this._document;
    }

    set document(document: IDocumentDraft99) {
        this._document = document;
    }
}
