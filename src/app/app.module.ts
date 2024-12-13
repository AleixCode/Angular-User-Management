import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/users', pathMatch: 'full' },
      { path: 'users', component: UsersListComponent },
      { path: 'new-user', component: NewUserComponent },
      { path: 'profile/:id', component: ProfileComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    UsersListComponent,
    NewUserComponent,
    ProfileComponent,
    TopBarComponent,
    FileUploadComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
