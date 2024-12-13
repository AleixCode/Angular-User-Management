import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser = { ...this.userForm.value };
      this.userService.addUser(newUser);
      this.userForm.reset();
      window.alert('Your user has been added!');
    }
  }
}
