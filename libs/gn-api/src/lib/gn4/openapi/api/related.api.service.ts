/**
 * GeoNetwork 4.0.2 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.2
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http'
import { CustomHttpParameterCodec } from '../encoder'
import { Observable } from 'rxjs'

import { RelatedResponseApiModel } from '../model/models'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable({
  providedIn: 'root',
})
export class RelatedApiService {
  protected basePath = 'http://localhost:8080/geonetwork/srv/api'
  public defaultHeaders = new HttpHeaders()
  public configuration = new Configuration()
  public encoder: HttpParameterCodec

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath
      }
      this.configuration.basePath = basePath
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec()
  }

  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value)
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key)
    }
    return httpParams
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string
  ): HttpParams {
    if (value == null) {
      return httpParams
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        ;(value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        )
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substr(0, 10)
          )
        } else {
          throw Error('key may not be null if value is Date')
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        )
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value)
    } else {
      throw Error('key may not be null if value is not object or array')
    }
    return httpParams
  }

  /**
   * Get record related resources for all requested metadatas
   * Retrieve related services, datasets, onlines, thumbnails, sources, ... to all requested records.&lt;br/&gt;&lt;a href&#x3D;\&#39;http://geonetwork-opensource.org/manuals/trunk/eng/users/user-guide/associating-resources/index.html\&#39;&gt;More info&lt;/a&gt;
   * @param type Type of related resource. If none, all resources are returned.
   * @param uuid Uuids of the metadatas you request the relations from.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAssociatedResourcesForRecords(
    type?: Array<
      | 'children'
      | 'parent'
      | 'brothersAndSisters'
      | 'siblings'
      | 'associated'
      | 'services'
      | 'datasets'
      | 'fcats'
      | 'hasfeaturecats'
      | 'sources'
      | 'hassources'
      | 'related'
      | 'onlines'
      | 'thumbnails'
    >,
    uuid?: Array<string>,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'application/xml' }
  ): Observable<{ [key: string]: RelatedResponseApiModel }>
  public getAssociatedResourcesForRecords(
    type?: Array<
      | 'children'
      | 'parent'
      | 'brothersAndSisters'
      | 'siblings'
      | 'associated'
      | 'services'
      | 'datasets'
      | 'fcats'
      | 'hasfeaturecats'
      | 'sources'
      | 'hassources'
      | 'related'
      | 'onlines'
      | 'thumbnails'
    >,
    uuid?: Array<string>,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'application/xml' }
  ): Observable<HttpResponse<{ [key: string]: RelatedResponseApiModel }>>
  public getAssociatedResourcesForRecords(
    type?: Array<
      | 'children'
      | 'parent'
      | 'brothersAndSisters'
      | 'siblings'
      | 'associated'
      | 'services'
      | 'datasets'
      | 'fcats'
      | 'hasfeaturecats'
      | 'sources'
      | 'hassources'
      | 'related'
      | 'onlines'
      | 'thumbnails'
    >,
    uuid?: Array<string>,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'application/xml' }
  ): Observable<HttpEvent<{ [key: string]: RelatedResponseApiModel }>>
  public getAssociatedResourcesForRecords(
    type?: Array<
      | 'children'
      | 'parent'
      | 'brothersAndSisters'
      | 'siblings'
      | 'associated'
      | 'services'
      | 'datasets'
      | 'fcats'
      | 'hasfeaturecats'
      | 'sources'
      | 'hassources'
      | 'related'
      | 'onlines'
      | 'thumbnails'
    >,
    uuid?: Array<string>,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' | 'application/xml' }
  ): Observable<any> {
    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (type) {
      type.forEach((element) => {
        queryParameters = this.addToHttpParams(
          queryParameters,
          <any>element,
          'type'
        )
      })
    }
    if (uuid) {
      uuid.forEach((element) => {
        queryParameters = this.addToHttpParams(
          queryParameters,
          <any>element,
          'uuid'
        )
      })
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json',
        'application/xml',
      ]
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      )
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.get<{ [key: string]: RelatedResponseApiModel }>(
      `${this.configuration.basePath}/related`,
      {
        params: queryParameters,
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }
}
