export interface MenuItem {
  text: string
  link: string
}

export interface User
  {
    username:  String,
      
    password: String,
      
    role: String,
     
    category: String,
      
    firstname: String,
      
    lastname:  String,
      
    email: String,
  }

  export interface Student
  {
    username:  String,      
    password: String,      
    role: String,     
    category: String,      
    firstname: String,      
    lastname:  String,      
    email: String,    
  }

  export interface UserAPIList {
    status: boolean
    data: User[]
  }

  export interface StudentAPIList {
    status: boolean
    data: Student[]
  }

