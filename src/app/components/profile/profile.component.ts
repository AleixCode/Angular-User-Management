import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id')!;
    this.user = this.userService.getUserById(userId);
  }
}
