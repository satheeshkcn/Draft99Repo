import { NgModule } from '@angular/core';

import { Draft99App1SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Draft99App1SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Draft99App1SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Draft99App1SharedCommonModule {}
