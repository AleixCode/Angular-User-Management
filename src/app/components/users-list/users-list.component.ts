import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users: User[] = [];

  filteredUsers: User[] = [];
  searchTerm: string = '';

  currentSortColumn: keyof User | '' = '';
  isSortAscending: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedUsers: User[] = [];

  constructor(private usersService: UsersService, private router: Router) {
    this.users = this.usersService.getUsers();
    this.filteredUsers = [...this.users];
    this.updatePaginatedUsers();
  }

  onSearchChange() {
    this.filteredUsers = this.users.filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  sortTable(column: keyof User) {
    if (this.currentSortColumn === column) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.currentSortColumn = column;
      this.isSortAscending = true;
    }

    this.filteredUsers.sort((a, b) => {
      const valueA = a[column].toLowerCase();
      const valueB = b[column].toLowerCase();

      if (valueA < valueB) return this.isSortAscending ? -1 : 1;
      if (valueA > valueB) return this.isSortAscending ? 1 : -1;
      return 0;
    });

    this.updatePaginatedUsers();
  }

  navigateToUser(userId: string): void {
    this.router.navigate(['/profile', userId]);
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'users.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const columns = ['Name', 'Surname', 'Email', 'ID'];
    const rows: any[] = [];
    this.users.forEach((user) => {
      const temp = [user.name, user.surname, user.email, user.id];
      rows.push(temp);
    });
    (doc as any).autoTable(columns, rows, { startY: 10 });
    doc.save('users.pdf');
  }

  exportToJSON() {
    const jsonData = JSON.stringify(this.users, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'users.json');
  }

  ngOnInit(): void {
    this.usersService.users$.subscribe((users) => {
      this.users = this.usersService.getUsers();
      this.filteredUsers = [...this.users];
      this.updatePaginatedUsers();
    });
  }
}
