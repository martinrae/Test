import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServiceCategory } from 'app/shared/model/service-category.model';

type EntityResponseType = HttpResponse<IServiceCategory>;
type EntityArrayResponseType = HttpResponse<IServiceCategory[]>;

@Injectable({ providedIn: 'root' })
export class ServiceCategoryService {
    private resourceUrl = SERVER_API_URL + 'api/service-categories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/service-categories';

    constructor(private http: HttpClient) {}

    create(serviceCategory: IServiceCategory): Observable<EntityResponseType> {
        return this.http.post<IServiceCategory>(this.resourceUrl, serviceCategory, { observe: 'response' });
    }

    update(serviceCategory: IServiceCategory): Observable<EntityResponseType> {
        return this.http.put<IServiceCategory>(this.resourceUrl, serviceCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IServiceCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IServiceCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IServiceCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
