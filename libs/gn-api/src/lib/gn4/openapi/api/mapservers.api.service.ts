/**
 * GeoNetwork 4.0.3 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.3
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

import { AnonymousMapserverApiModel } from '../model/models'
import { MapServerApiModel } from '../model/models'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable({
  providedIn: 'root',
})
export class MapserversApiService {
  protected basePath = 'https://apps.titellus.net/geonetwork/srv/api'
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
   * Add a mapserver
   * Return the id of the newly created mapserver.
   * @param mapServerApiModel Mapserver details
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addMapserver(
    mapServerApiModel: MapServerApiModel,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<number>
  public addMapserver(
    mapServerApiModel: MapServerApiModel,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<number>>
  public addMapserver(
    mapServerApiModel: MapServerApiModel,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<number>>
  public addMapserver(
    mapServerApiModel: MapServerApiModel,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (mapServerApiModel === null || mapServerApiModel === undefined) {
      throw new Error(
        'Required parameter mapServerApiModel was null or undefined when calling addMapserver.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.put<number>(
      `${this.configuration.basePath}/mapservers`,
      mapServerApiModel,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Remove a metadata mapserver resource
   * @param mapserverId Mapserver identifier
   * @param metadataUuid Record UUID.
   * @param resource Resource name (could be a file or a db connection)
   * @param metadataTitle Metadata title
   * @param metadataAbstract Metadata abstract
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<any>
  public deleteMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<HttpResponse<any>>
  public deleteMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<HttpEvent<any>>
  public deleteMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<any> {
    if (mapserverId === null || mapserverId === undefined) {
      throw new Error(
        'Required parameter mapserverId was null or undefined when calling deleteMapserverResource.'
      )
    }
    if (metadataUuid === null || metadataUuid === undefined) {
      throw new Error(
        'Required parameter metadataUuid was null or undefined when calling deleteMapserverResource.'
      )
    }
    if (resource === null || resource === undefined) {
      throw new Error(
        'Required parameter resource was null or undefined when calling deleteMapserverResource.'
      )
    }

    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (resource !== undefined && resource !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>resource,
        'resource'
      )
    }
    if (metadataTitle !== undefined && metadataTitle !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>metadataTitle,
        'metadataTitle'
      )
    }
    if (metadataAbstract !== undefined && metadataAbstract !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>metadataAbstract,
        'metadataAbstract'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json', 'text/plain']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
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

    return this.httpClient.delete<any>(
      `${this.configuration.basePath}/mapservers/${encodeURIComponent(
        String(mapserverId)
      )}/records/${encodeURIComponent(String(metadataUuid))}`,
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

  /**
   * Get a mapserver
   * @param mapserverId Mapserver identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMapserver(
    mapserverId: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public getMapserver(
    mapserverId: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<any>>
  public getMapserver(
    mapserverId: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<any>>
  public getMapserver(
    mapserverId: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (mapserverId === null || mapserverId === undefined) {
      throw new Error(
        'Required parameter mapserverId was null or undefined when calling getMapserver.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
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

    return this.httpClient.get<any>(
      `${this.configuration.basePath}/mapservers/${encodeURIComponent(
        String(mapserverId)
      )}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Check metadata mapserver resource is published
   * @param mapserverId Mapserver identifier
   * @param metadataUuid Record UUID.
   * @param resource Resource name (could be a file or a db connection)
   * @param metadataTitle Metadata title
   * @param metadataAbstract Metadata abstract
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<any>
  public getMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<HttpResponse<any>>
  public getMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<HttpEvent<any>>
  public getMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<any> {
    if (mapserverId === null || mapserverId === undefined) {
      throw new Error(
        'Required parameter mapserverId was null or undefined when calling getMapserverResource.'
      )
    }
    if (metadataUuid === null || metadataUuid === undefined) {
      throw new Error(
        'Required parameter metadataUuid was null or undefined when calling getMapserverResource.'
      )
    }
    if (resource === null || resource === undefined) {
      throw new Error(
        'Required parameter resource was null or undefined when calling getMapserverResource.'
      )
    }

    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (resource !== undefined && resource !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>resource,
        'resource'
      )
    }
    if (metadataTitle !== undefined && metadataTitle !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>metadataTitle,
        'metadataTitle'
      )
    }
    if (metadataAbstract !== undefined && metadataAbstract !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>metadataAbstract,
        'metadataAbstract'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json', 'text/plain']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
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

    return this.httpClient.get<any>(
      `${this.configuration.basePath}/mapservers/${encodeURIComponent(
        String(mapserverId)
      )}/records/${encodeURIComponent(String(metadataUuid))}`,
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

  /**
   * Get mapservers
   * Mapservers are used by the catalog to publish record attachments (eg. ZIP file with shape) or record associated resources (eg. database table, file on the local network) in a remote mapserver like GeoServer or MapServer. The catalog communicate with the mapserver using GeoServer REST API.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMapservers(
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public getMapservers(
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<any>>
  public getMapservers(
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<any>>
  public getMapservers(
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
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

    return this.httpClient.get<any>(
      `${this.configuration.basePath}/mapservers`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }

  /**
   * Publish a metadata resource in a mapserver
   * @param mapserverId Mapserver identifier
   * @param metadataUuid Record UUID.
   * @param resource Resource name (could be a file or a db connection)
   * @param metadataTitle Metadata title
   * @param metadataAbstract Metadata abstract
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public publishMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<any>
  public publishMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<HttpResponse<any>>
  public publishMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<HttpEvent<any>>
  public publishMapserverResource(
    mapserverId: string,
    metadataUuid: string,
    resource: string,
    metadataTitle?: string,
    metadataAbstract?: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' | 'text/plain' }
  ): Observable<any> {
    if (mapserverId === null || mapserverId === undefined) {
      throw new Error(
        'Required parameter mapserverId was null or undefined when calling publishMapserverResource.'
      )
    }
    if (metadataUuid === null || metadataUuid === undefined) {
      throw new Error(
        'Required parameter metadataUuid was null or undefined when calling publishMapserverResource.'
      )
    }
    if (resource === null || resource === undefined) {
      throw new Error(
        'Required parameter resource was null or undefined when calling publishMapserverResource.'
      )
    }

    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (resource !== undefined && resource !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>resource,
        'resource'
      )
    }
    if (metadataTitle !== undefined && metadataTitle !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>metadataTitle,
        'metadataTitle'
      )
    }
    if (metadataAbstract !== undefined && metadataAbstract !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>metadataAbstract,
        'metadataAbstract'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json', 'text/plain']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
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

    return this.httpClient.put<any>(
      `${this.configuration.basePath}/mapservers/${encodeURIComponent(
        String(mapserverId)
      )}/records/${encodeURIComponent(String(metadataUuid))}`,
      null,
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

  /**
   * Update a mapserver
   * @param mapserverId Mapserver identifier
   * @param mapServerApiModel Mapserver details
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateMapserver(
    mapserverId: number,
    mapServerApiModel: MapServerApiModel,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public updateMapserver(
    mapserverId: number,
    mapServerApiModel: MapServerApiModel,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<any>>
  public updateMapserver(
    mapserverId: number,
    mapServerApiModel: MapServerApiModel,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<any>>
  public updateMapserver(
    mapserverId: number,
    mapServerApiModel: MapServerApiModel,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (mapserverId === null || mapserverId === undefined) {
      throw new Error(
        'Required parameter mapserverId was null or undefined when calling updateMapserver.'
      )
    }
    if (mapServerApiModel === null || mapServerApiModel === undefined) {
      throw new Error(
        'Required parameter mapServerApiModel was null or undefined when calling updateMapserver.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json']
      httpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts)
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected)
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json']
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes)
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected)
    }

    let responseType: 'text' | 'json' = 'json'
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text'
    }

    return this.httpClient.put<any>(
      `${this.configuration.basePath}/mapservers/${encodeURIComponent(
        String(mapserverId)
      )}`,
      mapServerApiModel,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    )
  }
}
