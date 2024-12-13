import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  constructor(private userService: UsersService) {}

  // Handle file input
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        // Once the file is loaded, pass the content to the UsersService to load users
        this.userService.loadUsersFromFile(reader.result as string);
        console.log('Users loaded from file:', this.userService.getUsers());
      };

      reader.onerror = (error) => {
        window.alert('Error reading file:' + error);
      };
    }
  }
}
