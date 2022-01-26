import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestSignup } from '../models/RequestSignup';
import { ResponseSignup } from '../models/ResponseSignup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient) { }

  public signup(requestSignup:RequestSignup):Observable<ResponseSignup>{
    return this.httpClient.post<ResponseSignup>('http://localhost:3000/users', requestSignup)
  }
}
