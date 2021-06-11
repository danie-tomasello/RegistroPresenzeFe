import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, filter, finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { AuthappService } from './authapp.service';


export class Tokens{
  constructor(
    public token: string | null,
    public refreshToken: string | null
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private auth: AuthappService,private dialog:MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = this.addAuthToken(request, this.auth.getAuthToken(), this.auth.getRefreshToken());
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 406 && this.auth.isLogged()){

          this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
            top: '100px'
          });
          this.auth.clearAll();
          window.location.href = "http://localhost:4200/login";
        }
        if (error && error.status === 401 && this.auth.isLogged()) {
          return this.handle401Error(request,next);
        } else {
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  

private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.auth.refresh().pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          let tokens = new Tokens(res.headers.get("X-Auth"),res.headers.get("X-Refresh"))
          this.refreshTokenSubject.next(tokens);
          return next.handle(this.addAuthToken(request, tokens.token,tokens.refreshToken));
        }));
  
    } else {
      
      return this.refreshTokenSubject.pipe(
        filter(tokens => tokens != null),
        take(1),
        switchMap(tokens => {
          return next.handle(this.addAuthToken(request, tokens.token,tokens.refreshToken));
        }));
    }
  }

  private addAuthToken(request: HttpRequest<any>, token :string | null , refreshToken :string | null): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if(token!==null&&refreshToken!==null)
      return request.clone({
        setHeaders: {
          "X-Auth": token,
          "X-Refresh": refreshToken
        }
      });
    else return request;
    
  }
}
