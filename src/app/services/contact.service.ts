import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les contacts des professeurs
  getProfessors(): Observable<ContactType[]> {
    return this.http.get<ContactType[]>('http://localhost:3000/professeur');
  }

  createProfessor(professor: ContactType): Observable<ContactType> {
    return this.http.post<ContactType>(
      'http://localhost:3000/professeur',
      professor
    );
  }

  updateProfessor(professor: ContactType): Observable<ContactType> {
    const dataToUpdate = {}; // Ici, vous utiliserez les données réelles à mettre à jour
    return this.http.patch<ContactType>(
      `http://localhost:3000/professeur/${professor._id}`,
      dataToUpdate
    );
  }

  deleteProfessor(professor: ContactType): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/professeur/${professor._id}`
    );
  }

  // Méthode pour récupérer les contacts des étudiants
  getStudents(): Observable<ContactType[]> {
    return this.http.get<ContactType[]>('http://localhost:3000/etudiant');
  }

  createStudent(student: ContactType): Observable<ContactType> {
    return this.http.post<ContactType>(
      'http://localhost:3000/etudiant',
      student
    );
  }

  updateStudent(student: ContactType): Observable<ContactType> {
    const dataToUpdate = {}; // Utilisez les données réelles pour la mise à jour
    return this.http.patch<ContactType>(
      `http://localhost:3000/etudiant/${student._id}`,
      dataToUpdate
    );
  }

  deleteStudent(student: ContactType): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/etudiant/${student._id}`
    );
  }
}

export type ContactType = {
  _id?: string;
  nom?: string;
  email?: string;
  telephone?: number;
};
