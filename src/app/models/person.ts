// src/app/models/person.ts
export interface PersonDto {
  id: number;
  name: string;
  birthDate: string;  // ISO string from backend, e.g. "1986-07-16"
  daysAlive: number;
}
