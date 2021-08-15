export interface programspecilization{
    programspecilizationid:number;
    
    program:{
        programId:string;
    }
    
    specilization:{
    id:string;
    description:string
    }

    cnt_centerId:number,
    description:string,
    code:string,
    departmentid_fk:number;
    
}