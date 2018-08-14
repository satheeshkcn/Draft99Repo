import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentDraft99 } from 'app/shared/model/document-draft-99.model';

@Component({
    selector: 'jhi-document-draft-99-detail',
    templateUrl: './document-draft-99-detail.component.html'
})
export class DocumentDraft99DetailComponent implements OnInit {
    document: IDocumentDraft99;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
