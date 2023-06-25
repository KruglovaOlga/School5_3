import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { User } from '../user.interfaces';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent implements OnInit {
  inputForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private service: UserService) { }

  ngOnInit(): void {
    // create the input form group with student data fields
    this.inputForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      category: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     
    });
  }
  
    onSubmit(): void {
      if(this.inputForm.valid){
        console.log(this.inputForm.value);
        const user = this.inputForm.value as User;
        this.service.insertUser(user).subscribe((response) => {
          console.log(response);
          console.log("submitted");
        })
      } else {
        console.log('Form is not valid');
      }   
    
    }

  // handle the form cancellation
  // onCancel() {
  //   // reset the input form
  //   this.inputForm.reset();
  // }
  
}



