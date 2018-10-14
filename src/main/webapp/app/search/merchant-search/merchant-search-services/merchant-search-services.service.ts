import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IService } from 'app/shared/model/service.model';

type EntityResponseType = HttpResponse<IService>;
type EntityArrayResponseType = HttpResponse<IService[]>;

@Injectable({ providedIn: 'root' })
export class MerchantSearchServicesService {
    private resourceUrl = SERVER_API_URL + 'api/services';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/services';

    constructor(private http: HttpClient) {}

    create(service: IService): Observable<EntityResponseType> {
        return this.http.post<IService>(this.resourceUrl, service, { observe: 'response' });
    }

    update(service: IService): Observable<EntityResponseType> {
        return this.http.put<IService>(this.resourceUrl, service, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IService[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IService[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}