import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";

import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { OAuthStorage } from "angular-oauth2-oidc";

//Can't resolve all parameters for AuthInterceptor: (?

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
        private oauthStorage: OAuthStorage,
        private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.oauthStorage.getItem('access_token');

        if (req.url.startsWith('http://www.angular.at/api')) {
            const headers = req.headers.set('Authorization', 'Bearer ' + token);
            req = req.clone({ headers });
        }
        return next.handle(req).pipe(
            catchError(err => this.handleError(err))
        );


    }

    handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {

        if (err.status === 401 || err.status === 403) {
            // 401: Unauthorized
            // 403: Forbidden
            this.router.navigate(['/home', {needsLogin: true}]);
        }

        return throwError(err);

    }
}