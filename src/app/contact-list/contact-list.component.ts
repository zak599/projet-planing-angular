import { Component, OnInit } from '@angular/core';
import { ContactService, ContactType } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService],
})
export class ContactListComponent implements OnInit {
  professors: ContactType[] = [];
  students: ContactType[] = [];
  activeTab: string = 'professors';

  filterName: string = ''; // Variable pour le filtre par nom
  filterEmail: string = ''; // Variable pour le filtre par email
  filterPhone: string = ''; // Variable pour le filtre par téléphone

  filteredData: ContactType[] = []; // Variable pour stocker les données filtrées

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.fetchProfessors();
    this.fetchStudents();
  }

  fetchProfessors() {
    this.contactService.getProfessors().subscribe(
      (res: ContactType[]) => {
        this.professors = res;
        this.applyFilter(); // Appliquer le filtre après récupération des données
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des professeurs : ',
          error
        );
      }
    );
  }

  fetchStudents() {
    this.contactService.getStudents().subscribe(
      (res: ContactType[]) => {
        this.students = res;
        this.applyFilter(); // Appliquer le filtre après récupération des données
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants : ', error);
      }
    );
  }

  // Méthode de filtrage générique
  applyFilter(): void {
    let data =
      this.activeTab === 'professors' ? this.professors : this.students;
    this.filteredData = data.filter(
      (contact) =>
        (this.filterName === '' ||
          (contact.nom &&
            contact.nom
              .toLowerCase()
              .startsWith(this.filterName.toLowerCase()))) &&
        (this.filterEmail === '' ||
          (contact.email &&
            contact.email
              .toLowerCase()
              .startsWith(this.filterEmail.toLowerCase()))) &&
        (this.filterPhone === '' ||
          (contact.telephone &&
            contact.telephone.toString().startsWith(this.filterPhone)))
    );
  }

  changeTab(tab: string) {
    this.activeTab = tab;
    // Réinitialiser les filtres lors du changement d'onglet
    this.resetFilters();
  }

  resetFilters() {
    this.filterName = '';
    this.filterEmail = '';
    this.filterPhone = '';
    this.applyFilter();
  }
}
