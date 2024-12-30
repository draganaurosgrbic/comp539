import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ROUTES } from './routes';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private storageService: StorageService,
        private router: Router,
    ) { }

    canActivate() {
        if (!this.storageService.getToken()) {
            this.router.navigate([ROUTES.login]);
            return false;
        }
        return true;
    }

}