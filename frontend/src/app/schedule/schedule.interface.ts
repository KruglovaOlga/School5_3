export interface MenuItem {
    text: string
    link: string
  }
  

export interface Schedule {
    day_of_week: Number,
        
      start_time: String,
        
      finish_time: String,
       
      lesson: String,
        
      group:  String,
        
      classroom:  String,
        
      teacher:  String,
        
      students: [
         String          
      ],
    };
    
    
    export interface ScheduleAPIList {
        status: boolean
        data: Schedule[]
      }