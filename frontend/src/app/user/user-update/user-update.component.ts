import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service'; 
import { User } from '../user.interfaces'; 

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  updateUserForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  success = '';
  currentUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: ['', Validators.required],
      category: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.updateUser(this.f['username'].value, this.updateUserForm.value)
      .subscribe(
        data => {
          // handle successful update
          console.log(data);
          this.loading = false;
          this.success = 'User updated successfully';
          this.currentUser = data;
        },
        error => {
          // handle error response
          console.error(error);
          this.error = error;
          this.loading = false;
        });
  }

}
