import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProjectDraft99 } from 'app/shared/model/project-draft-99.model';

@Component({
    selector: 'jhi-project-draft-99-detail',
    templateUrl: './project-draft-99-detail.component.html'
})
export class ProjectDraft99DetailComponent implements OnInit {
    project: IProjectDraft99;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
