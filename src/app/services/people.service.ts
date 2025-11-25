// src/app/services/people.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonDto } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  // Your Spring Boot backend
  private readonly apiUrl = 'http://localhost:12121/api/people';

  constructor(private http: HttpClient) {}

  list(): Observable<PersonDto[]> {
    return this.http.get<PersonDto[]>(this.apiUrl);
  }

  create(person: { name: string; birthDate: string }): Observable<PersonDto> {
    return this.http.post<PersonDto>(this.apiUrl, person);
  }
}
