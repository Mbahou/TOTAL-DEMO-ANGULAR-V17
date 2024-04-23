import {HttpEvent, HttpHandler, HttpInterceptor , HttpRequest} from '@angular/common/http';
import {finalize, Observable} from "rxjs";
import {AppStateService} from "./app-state.service";
import {Injectable} from "@angular/core";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private appState : AppStateService,private loadingService  : LoadingService){
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoadingSpinner();

    //PREMIERE SOLUTION
/*    this.appState.setProductState({
      status :"LOADING"
    })*/
    let req = request.clone({
      headers : request.headers.set("Authorization", "Bearer JWT")

    }); //copie de request
    req.headers.set("Authorization", "Bearer JWT");
    return next.handle(req).pipe(
      finalize(() =>{
        this.loadingService.hideLoadingSpinner();
        //premiere solution
    /*    this.appState.setProductState({
          status : "LOADED"
        })*/

    })
    );
  }

}


