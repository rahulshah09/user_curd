import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { identifierName } from "@angular/compiler";


@Injectable({
    providedIn: 'root'
})
export class ApiService{

    constructor(private http: HttpClient) {}

    getUsers():Observable<any> {
        return this.http.get<any>("http://localhost:5000/getAllUsers").pipe(map((res:any)=>{
            return res;
        }))
    } 

    postUser(data : any):Observable<any>{
        return this.http.post<any>('http://localhost:5000/addUser',data);  
    }
    deleteUser(id : number): Observable<any> {
        return this.http.delete<any>('http://localhost:5000/deleteUser/'+id);
    }

    updateUser(id : number,data :any): Observable<any>{
        return this.http.put<any>('http://localhost:5000/editUser/'+id,data);
    }

    

}


