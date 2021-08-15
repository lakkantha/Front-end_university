export interface program{

programStartedId:number,
dateTo:Date,
    
   program:{
      programId:number;
      title:string;
      specilizationApplicable:boolean;
      streamApplicable:boolean;
      hasForiegnStudent:boolean,
      hasLocalStudent:boolean,
      facultyId:{
         
            id:number;

      }
      department:{
         departmentId:number;
      }
      
      
   }
    programId:number,
    title:string,
    isdisciplineapplicable:boolean
    haslocalstudent:boolean;
    hasforiegnstudent:boolean;
    hasbothstudents:boolean;
studenttypeid:string;
multiplebatchapplicable:boolean,
 code:string;
 
 isSpecelizationApplicable:boolean;   
 academicyearid:number;
 batchno:number;
 programschedulecode:string
 foreignfee:number,


 department:{
    code: string
    departmentId: number
    description: string
    emp_employeeCode_department: string
 }

 faculty:{
    code: string,
    description: string,
    emp_employeeCode_assistant: string,
    emp_employeeCode_dean: string,
    id: number,
    intergrationCode: string,
    numberOfDepartments: number,
   
 }

 academicYear:{
    id: number
    year: string
 }

 studentType:{
    description: string
    id: number
 }




 /////////more to write

}