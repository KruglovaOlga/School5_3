import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  deleteUserForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.deleteUserForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.deleteUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.deleteUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.deleteUser(this.f['username'].value)
      .subscribe(
        data => {
          // handle successful deletion
          console.log(data);
          this.loading = false;
        },
        error => {
          // handle error response
          console.error(error);
          this.error = error;
          this.loading = false;
        });
  }

}
