import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectDraft99 } from 'app/shared/model/project-draft-99.model';
import { ProjectDraft99Service } from './project-draft-99.service';
import { ProjectDraft99Component } from './project-draft-99.component';
import { ProjectDraft99DetailComponent } from './project-draft-99-detail.component';
import { ProjectDraft99UpdateComponent } from './project-draft-99-update.component';
import { ProjectDraft99DeletePopupComponent } from './project-draft-99-delete-dialog.component';
import { IProjectDraft99 } from 'app/shared/model/project-draft-99.model';

@Injectable({ providedIn: 'root' })
export class ProjectDraft99Resolve implements Resolve<IProjectDraft99> {
    constructor(private service: ProjectDraft99Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((project: HttpResponse<ProjectDraft99>) => project.body));
        }
        return of(new ProjectDraft99());
    }
}

export const projectRoute: Routes = [
    {
        path: 'project-draft-99',
        component: ProjectDraft99Component,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-draft-99/:id/view',
        component: ProjectDraft99DetailComponent,
        resolve: {
            project: ProjectDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-draft-99/new',
        component: ProjectDraft99UpdateComponent,
        resolve: {
            project: ProjectDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-draft-99/:id/edit',
        component: ProjectDraft99UpdateComponent,
        resolve: {
            project: ProjectDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-draft-99/:id/delete',
        component: ProjectDraft99DeletePopupComponent,
        resolve: {
            project: ProjectDraft99Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
