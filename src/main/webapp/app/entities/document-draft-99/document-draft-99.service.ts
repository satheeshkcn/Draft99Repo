import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentDraft99 } from 'app/shared/model/document-draft-99.model';

type EntityResponseType = HttpResponse<IDocumentDraft99>;
type EntityArrayResponseType = HttpResponse<IDocumentDraft99[]>;

@Injectable({ providedIn: 'root' })
export class DocumentDraft99Service {
    private resourceUrl = SERVER_API_URL + 'api/documents';

    constructor(private http: HttpClient) {}

    create(document: IDocumentDraft99): Observable<EntityResponseType> {
        return this.http.post<IDocumentDraft99>(this.resourceUrl, document, { observe: 'response' });
    }

    update(document: IDocumentDraft99): Observable<EntityResponseType> {
        return this.http.put<IDocumentDraft99>(this.resourceUrl, document, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentDraft99>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentDraft99[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
