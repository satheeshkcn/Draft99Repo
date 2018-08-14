import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Draft99App1SharedModule } from 'app/shared';
import {
    ProjectDraft99Component,
    ProjectDraft99DetailComponent,
    ProjectDraft99UpdateComponent,
    ProjectDraft99DeletePopupComponent,
    ProjectDraft99DeleteDialogComponent,
    projectRoute,
    projectPopupRoute
} from './';

const ENTITY_STATES = [...projectRoute, ...projectPopupRoute];

@NgModule({
    imports: [Draft99App1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProjectDraft99Component,
        ProjectDraft99DetailComponent,
        ProjectDraft99UpdateComponent,
        ProjectDraft99DeleteDialogComponent,
        ProjectDraft99DeletePopupComponent
    ],
    entryComponents: [
        ProjectDraft99Component,
        ProjectDraft99UpdateComponent,
        ProjectDraft99DeleteDialogComponent,
        ProjectDraft99DeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Draft99App1ProjectDraft99Module {}
