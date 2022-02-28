import { Component, OnInit } from '@angular/core';
import { comments } from '../classes/comments';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserModel } from './user.model';
import { ApiService } from '../services/Api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj!: UserModel ;
  user_id: any;
  showAdd!: boolean;
  showUpdate !: boolean;

 
  constructor(private api: ApiService, private http: HttpClient, private formbuilder: FormBuilder) {
    this.formValue = new FormGroup({
      user_first_name: new FormControl(''),
      user_last_name: new FormControl(''),
      user_organization_name: new FormControl(''),
      user_email: new FormControl(''),
      user_created_by: new FormControl(''),
      user_status: new FormControl(''),
      user_confirmation_status : new FormControl(''),
      user_freeze: new FormControl('')
      
 });
   }


  lstcomments: comments[] = [];

  ngOnInit(): void {

    this.api.getUsers().subscribe
    (
      data=>
      {
        this.lstcomments = data;
      }
    );
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postUserDetails(){
    this.userModelObj={
      user_first_name : this.formValue.controls['user_first_name'].value,
      user_last_name : this.formValue.controls['user_last_name'].value,
      user_organization_name: this.formValue.controls['user_organization_name'].value,
      user_email : this.formValue.controls['user_email'].value,
      user_created_by : this.formValue.controls['user_created_by'].value,
      user_status : this.formValue.controls['user_status'].value,
      user_confirmation_status : this.formValue.controls['user_confirmation_status'].value,
      user_freeze : this.formValue.controls['user_freeze'].value
     }  
    this.api.postUser(this.userModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully") 
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllUsers();  
    },
      err=>{
      alert("Something Went wrong");
    })    
    }
    getAllUsers(){
      this.api.getUsers().subscribe
      (
        data=>
        {
          this.lstcomments = data;
        }
      );
    }
    deleteUserDetails(id : any): void {
      this.api.deleteUser(id)
      .subscribe(res =>{
        alert("User Deleted")
        this.getAllUsers();
      })
    }

    editUserDetails(com:any){
        this.showAdd = false;
        this.showUpdate = true;
        this.user_id= com.user_id;
        this.formValue.controls['user_first_name'].setValue(com.user_first_name),
        this.formValue.controls['user_last_name'].setValue(com.user_last_name),
        this.formValue.controls['user_organization_name'].setValue(com.user_organization_name),
        this.formValue.controls['user_email'].setValue(com.user_email),
        this.formValue.controls['user_created_by'].setValue(com.user_created_by),
        this.formValue.controls['user_status'].setValue(com.user_status),
        this.formValue.controls['user_confirmation_status'].setValue(com.user_confirmation_status),
        this.formValue.controls['user_freeze'].setValue(com.user_freeze)  
    }
    updateUserDetails(){
    
      this.userModelObj={
        user_first_name : this.formValue.controls['user_first_name'].value,
        user_last_name : this.formValue.controls['user_last_name'].value,
        user_organization_name: this.formValue.controls['user_organization_name'].value,
        user_email : this.formValue.controls['user_email'].value,
        user_created_by : this.formValue.controls['user_created_by'].value,
        user_status : this.formValue.controls['user_status'].value,
        user_confirmation_status : this.formValue.controls['user_confirmation_status'].value,
        user_freeze : this.formValue.controls['user_freeze'].value
      }
      this.api.updateUser(this.user_id,this.userModelObj)
        .subscribe(res=>{
          console.log(res);
          alert("Employee Updated Successfully") 
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset(); 
          this.getAllUsers();  
        })    
          
       
     }
    
}



