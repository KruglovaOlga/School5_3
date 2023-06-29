import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service'; 
import { User } from '../user.interfaces'; 
import { ActivatedRoute } from '@angular/router'; 

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
  username!: string; 

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: ['', Validators.required],
      category: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
      
    });

    // get the current user data by username
    this.userService.getUserByUsername(this.f['username'].value).subscribe(
      data => {
        this.currentUser = data;
        //this.updateUserForm.patchValue(this.currentUser);

        // populate the form with the current user data
        this.updateUserForm.patchValue({
          username: this.currentUser.username,
          role: this.currentUser.role,
          category: this.currentUser.category,
          firstname: this.currentUser.firstname,
          lastname: this.currentUser.lastname,
          email: this.currentUser.email
         
        });
        
      },
      error => {
        this.error = error;
      }
    );
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
    // call the updateUser method from the userService
   this.userService.updateUser(this.updateUserForm.value).subscribe(
      data => {
        this.success = 'User updated successfully';
        console.log(data);
        this.loading = false;
        // update the current user data with the new data
        this.currentUser = data;
        
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}

