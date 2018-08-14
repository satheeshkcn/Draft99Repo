import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentDraft99 } from 'app/shared/model/document-draft-99.model';
import { DocumentDraft99Service } from './document-draft-99.service';
import { DocumentDraft99Component } from './document-draft-99.component';
import { DocumentDraft99DetailComponent } from './document-draft-99-detail.component';
import { DocumentDraft99UpdateComponent } from './document-draft-99-update.component';
import { DocumentDraft99DeletePopupComponent } from './document-draft-99-delete-dialog.component';
import { IDocumentDraft99 } from 'app/shared/model/document-draft-99.model';

@Injectable({ providedIn: 'root' })
export class DocumentDraft99Resolve implements Resolve<IDocumentDraft99> {
    constructor(private service: DocumentDraft99Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((document: HttpResponse<DocumentDraft99>) => document.body));
        }
        return of(new DocumentDraft99());
    }
}

export const documentRoute: Routes = [
    {
        path: 'document-draft-99',
        component: DocumentDraft99Component,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-draft-99/:id/view',
        component: DocumentDraft99DetailComponent,
        resolve: {
            document: DocumentDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-draft-99/new',
        component: DocumentDraft99UpdateComponent,
        resolve: {
            document: DocumentDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document-draft-99/:id/edit',
        component: DocumentDraft99UpdateComponent,
        resolve: {
            document: DocumentDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: 'document-draft-99/:id/delete',
        component: DocumentDraft99DeletePopupComponent,
        resolve: {
            document: DocumentDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
