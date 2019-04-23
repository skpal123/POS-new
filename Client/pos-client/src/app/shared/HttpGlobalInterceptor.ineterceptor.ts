import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler, HttpHeaders } from "@angular/common/http";
import { SessionService } from "../services/common/session.service";

@Injectable()
export class HttpGlobalInterceptor implements HttpInterceptor {
  UserInfo:any;
  constructor(private _sessionService:SessionService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    // this approch orginal header is replaced by new header
    // const authReq = req.clone({
    //   headers: new HttpHeaders({
    //     'sessionId': sessionStorage.getItem("sessionId"),
    //     'lang': lang!=null&& lang!=""?lang:'en',
    //     'UserId':JSON.parse(this.UserInfo)!=null?JSON.parse(this.UserInfo).Id:null,
    //     'ActionName':req.method,
    //     'AgentId':JSON.parse(this.UserInfo)!=null?JSON.parse(this.UserInfo).AgentId:null
    //   })
    // });
    const authReq = req.clone({
        headers: req.headers.set('sessionId',  this._sessionService!=null?this._sessionService.SessionId:null)
        .set('UserId',this._sessionService!=null?this._sessionService.User_Id:null)
        .set( 'ActionName',req.method)
      });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}