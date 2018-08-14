import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Draft99App1ProjectDraft99Module } from './project-draft-99/project-draft-99.module';
import { Draft99App1DocumentDraft99Module } from './document-draft-99/document-draft-99.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Draft99App1ProjectDraft99Module,
        Draft99App1DocumentDraft99Module,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Draft99App1EntityModule {}
