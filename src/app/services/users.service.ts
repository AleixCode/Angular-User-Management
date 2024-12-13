import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  loadUsersFromFile(fileContent: string) {
    try {
      const users = JSON.parse(fileContent);
      this.usersSubject.next(users);
      console.log(users);
    } catch (error) {
      window.alert('Error parsing users from file:' + error);
    }
  }

  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }

  getUserById(id: string): User | undefined {
    const currentUsers = this.usersSubject.value;
    return currentUsers.find((user) => user.id === id);
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }
}
