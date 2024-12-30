import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../model/url';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private http: HttpClient,
  ) { }

  getUrl(shortUrl: string): Observable<Url> {
    return this.http.get<Url>(`${environment.apiUrl}/url/${shortUrl}`);
  }

  postUrl(longUrl: string): Observable<Url> {
    return this.http.post<Url>(`${environment.apiUrl}/url`, { longUrl });
  }

}
