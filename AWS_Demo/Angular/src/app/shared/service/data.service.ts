import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    private actionUrl: string;

    constructor(private _http: Http) {
        this.actionUrl = 'http://18.207.184.53:3000/api/';
    }
    // GetAll
    GetAll(ns: string): Observable<any> {
        return this._http.get(this.actionUrl + ns).map((respone: Response) => respone.json());
    }
    // Get by Id
    GetbyID(ns: string, id: any): Observable<any> {
        return this._http.get(this.actionUrl + ns + '/' + id).map((respone: Response) => respone.json());
    }
    // Post
    Post(ns: string, data: any): Observable<any> {
        return this._http.post(this.actionUrl + ns, data).map((respone: Response) => respone.json());
    }
    // Delete by Id
    Delete(ns: string): Observable<any> {
        return this._http.delete(this.actionUrl + ns).map((respone: Response) => respone.json());
    }
    // Update
    Update(ns: string, data: any): Observable<any> {
        return this._http.put(this.actionUrl + ns, data).map((respone: Response) => respone.json());
    }
}
