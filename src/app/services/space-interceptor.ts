import {
    HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {NgProgressService} from "ng2-progressbar";
import 'rxjs/add/operator/do';

@Injectable()
export class SpaceInterceptor implements HttpInterceptor {
    constructor(private pService: NgProgressService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.pService.start();
        return next.handle(req).do(event => {
            this.pService.done();
        })
    }
}
