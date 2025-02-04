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

import { PageJSONWrapperApiModel } from '../model/models'

import { BASE_PATH, COLLECTION_FORMATS } from '../variables'
import { Configuration } from '../configuration'

@Injectable({
  providedIn: 'root',
})
export class PagesApiService {
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
   * Return the page object details except the content
   * &lt;a href&#x3D;\&#39;http://geonetwork-opensource.org/manuals/trunk/eng/users/user-guide/define-static-pages/define-pages.html\&#39;&gt;More info&lt;/a&gt;
   * @param language
   * @param pageId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getPage(
    language: string,
    pageId: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<PageJSONWrapperApiModel>
  public getPage(
    language: string,
    pageId: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<PageJSONWrapperApiModel>>
  public getPage(
    language: string,
    pageId: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<PageJSONWrapperApiModel>>
  public getPage(
    language: string,
    pageId: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (language === null || language === undefined) {
      throw new Error(
        'Required parameter language was null or undefined when calling getPage.'
      )
    }
    if (pageId === null || pageId === undefined) {
      throw new Error(
        'Required parameter pageId was null or undefined when calling getPage.'
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

    return this.httpClient.get<PageJSONWrapperApiModel>(
      `${this.configuration.basePath}/pages/${encodeURIComponent(
        String(language)
      )}/${encodeURIComponent(String(pageId))}`,
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
   * Return the static html content identified by pageId
   * &lt;a href&#x3D;\&#39;http://geonetwork-opensource.org/manuals/trunk/eng/users/user-guide/define-static-pages/define-pages.html\&#39;&gt;More info&lt;/a&gt;
   * @param language
   * @param pageId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getPageContent(
    language: string,
    pageId: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json' | 'text/plain;charset&#x3D;UTF-8'
    }
  ): Observable<string>
  public getPageContent(
    language: string,
    pageId: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json' | 'text/plain;charset&#x3D;UTF-8'
    }
  ): Observable<HttpResponse<string>>
  public getPageContent(
    language: string,
    pageId: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json' | 'text/plain;charset&#x3D;UTF-8'
    }
  ): Observable<HttpEvent<string>>
  public getPageContent(
    language: string,
    pageId: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: {
      httpHeaderAccept?: 'application/json' | 'text/plain;charset&#x3D;UTF-8'
    }
  ): Observable<any> {
    if (language === null || language === undefined) {
      throw new Error(
        'Required parameter language was null or undefined when calling getPageContent.'
      )
    }
    if (pageId === null || pageId === undefined) {
      throw new Error(
        'Required parameter pageId was null or undefined when calling getPageContent.'
      )
    }

    let headers = this.defaultHeaders

    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json',
        'text/plain;charset=UTF-8',
      ]
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

    return this.httpClient.get<string>(
      `${this.configuration.basePath}/pages/${encodeURIComponent(
        String(language)
      )}/${encodeURIComponent(String(pageId))}/content`,
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
   * List all pages according to the filters
   * &lt;a href&#x3D;\&#39;http://geonetwork-opensource.org/manuals/trunk/eng/users/user-guide/define-static-pages/define-pages.html\&#39;&gt;More info&lt;/a&gt;
   * @param language
   * @param section
   * @param format
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listPages(
    language?: string,
    section?:
      | 'ALL'
      | 'TOP'
      | 'FOOTER'
      | 'MENU'
      | 'SUBMENU'
      | 'CUSTOM_MENU1'
      | 'CUSTOM_MENU2'
      | 'CUSTOM_MENU3'
      | 'DRAFT',
    format?: 'LINK' | 'HTML' | 'TEXT' | 'MARKDOWN' | 'WIKI',
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any>
  public listPages(
    language?: string,
    section?:
      | 'ALL'
      | 'TOP'
      | 'FOOTER'
      | 'MENU'
      | 'SUBMENU'
      | 'CUSTOM_MENU1'
      | 'CUSTOM_MENU2'
      | 'CUSTOM_MENU3'
      | 'DRAFT',
    format?: 'LINK' | 'HTML' | 'TEXT' | 'MARKDOWN' | 'WIKI',
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<any>>
  public listPages(
    language?: string,
    section?:
      | 'ALL'
      | 'TOP'
      | 'FOOTER'
      | 'MENU'
      | 'SUBMENU'
      | 'CUSTOM_MENU1'
      | 'CUSTOM_MENU2'
      | 'CUSTOM_MENU3'
      | 'DRAFT',
    format?: 'LINK' | 'HTML' | 'TEXT' | 'MARKDOWN' | 'WIKI',
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<any>>
  public listPages(
    language?: string,
    section?:
      | 'ALL'
      | 'TOP'
      | 'FOOTER'
      | 'MENU'
      | 'SUBMENU'
      | 'CUSTOM_MENU1'
      | 'CUSTOM_MENU2'
      | 'CUSTOM_MENU3'
      | 'DRAFT',
    format?: 'LINK' | 'HTML' | 'TEXT' | 'MARKDOWN' | 'WIKI',
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    let queryParameters = new HttpParams({ encoder: this.encoder })
    if (language !== undefined && language !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>language,
        'language'
      )
    }
    if (section !== undefined && section !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>section,
        'section'
      )
    }
    if (format !== undefined && format !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>format,
        'format'
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
      `${this.configuration.basePath}/pages/list`,
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
