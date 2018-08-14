import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjectDraft99 } from 'app/shared/model/project-draft-99.model';

type EntityResponseType = HttpResponse<IProjectDraft99>;
type EntityArrayResponseType = HttpResponse<IProjectDraft99[]>;

@Injectable({ providedIn: 'root' })
export class ProjectDraft99Service {
    private resourceUrl = SERVER_API_URL + 'api/projects';

    constructor(private http: HttpClient) {}

    create(project: IProjectDraft99): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .post<IProjectDraft99>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(project: IProjectDraft99): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .put<IProjectDraft99>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProjectDraft99>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProjectDraft99[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(project: IProjectDraft99): IProjectDraft99 {
        const copy: IProjectDraft99 = Object.assign({}, project, {
            createdDate: project.createdDate != null && project.createdDate.isValid() ? project.createdDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((project: IProjectDraft99) => {
            project.createdDate = project.createdDate != null ? moment(project.createdDate) : null;
        });
        return res;
    }
}
