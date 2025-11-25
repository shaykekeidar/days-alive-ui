// src/app/app.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PeopleService } from './services/people.service';
import { PersonDto } from './models/person';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {

  title = 'Days Alive';
  people: PersonDto[] = [];
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private peopleService: PeopleService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      birthDate: ['']   // bound to <input type="date">
    });
  }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.error = null;
    this.peopleService.list().subscribe({
      next: (data) => {
        this.people = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load people';
        this.loading = false;
      }
    });
  }

  addPerson(): void {
    const { name, birthDate } = this.form.value;

    if (!name || !birthDate) {
      return;
    }

    const payload = {
      name,
      // HTML date input gives "YYYY-MM-DD" which matches backend parsing
      birthDate
    };

    this.peopleService.create(payload).subscribe({
      next: (created) => {
        this.people.push(created);
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create person';
      }
    });
  }
}