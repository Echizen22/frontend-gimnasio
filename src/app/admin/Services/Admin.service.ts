import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  doGet<T>(url: string, options: {
    headers?: HttpHeaders;
    context?: HttpContext;
    params?: HttpParams | { [param: string]: string | number | boolean };
    responseType: 'json';
  }): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, options);
  }

  // Método genérico para realizar solicitudes HTTP POST
  doPost<T>(url: string, body: any, options: {
    headers?: HttpHeaders;
    context?: HttpContext;
    params?: HttpParams | { [param: string]: string | number | boolean };
    responseType: 'json';
  }): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body, options);
  }

  // Método genérico para realizar solicitudes HTTP GET con un id
  doGetWithId<T>(baseUrl: string, id: string, options: {
    headers?: HttpHeaders;
    context?: HttpContext;
    params?: HttpParams | { [param: string]: string | number | boolean };
    responseType: 'json';
  }): Observable<T> {
    const url = `${baseUrl}/${id}`;
    return this.http.get<T>(this.baseUrl + url, options);
  }

  // Método genérico para realizar solicitudes HTTP PATCH
  doPatch<T>(baseurl: string, id: string, body: any, options: {
    headers?: HttpHeaders;
    context?: HttpContext;
    params?: HttpParams | { [param: string]: string | number | boolean };
    responseType: 'json';
  }): Observable<T> {
    const url = `${baseurl}/${id}`;
    return this.http.patch<T>(this.baseUrl + url, body, options);
  }

  // Método genérico para realizar solicitudes HTTP DELETE
  doDelete<T>(url: string | (string | number)[], options: {
    headers?: HttpHeaders;
    context?: HttpContext;
    params?: HttpParams | { [param: string]: string | number | boolean };
    responseType: 'json';
  }): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url, options);
  }

}
