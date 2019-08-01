import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RefusedConnectionInterceptor implements HttpInterceptor {
    
    constructor(private router: Router) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(catchError(error => {
            if (error.status === 0) {
                this.router.navigate(['/503']);
                return;
            }
            return next.handle(request.clone());
        }));
    }
}