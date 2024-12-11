import { Injectable } from '@angular/core';
import { Url } from '../model/url';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly TOKEN_KEY = 'auth';
  readonly URL_KEY = 'url';

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUrls() {
    return JSON.parse(localStorage.getItem(this.URL_KEY) as string) as string[];
  }

  storeUrl(url: Url) {
    const temp = this.getUrls() || [];
    if (!temp.includes(url.shortUrl)) {
      temp.push(url.shortUrl);
    }
    localStorage.setItem(this.URL_KEY, JSON.stringify(temp));
  }

}
