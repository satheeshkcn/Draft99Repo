import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Draft99App1SharedModule } from 'app/shared';
import {
    DocumentDraft99Component,
    DocumentDraft99DetailComponent,
    DocumentDraft99UpdateComponent,
    DocumentDraft99DeletePopupComponent,
    DocumentDraft99DeleteDialogComponent,
    documentRoute,
    documentPopupRoute
} from './';

const ENTITY_STATES = [...documentRoute, ...documentPopupRoute];

@NgModule({
    imports: [Draft99App1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentDraft99Component,
        DocumentDraft99DetailComponent,
        DocumentDraft99UpdateComponent,
        DocumentDraft99DeleteDialogComponent,
        DocumentDraft99DeletePopupComponent
    ],
    entryComponents: [
        DocumentDraft99Component,
        DocumentDraft99UpdateComponent,
        DocumentDraft99DeleteDialogComponent,
        DocumentDraft99DeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Draft99App1DocumentDraft99Module {}
