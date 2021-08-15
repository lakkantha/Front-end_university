
export interface ProgramStarted{
    programStartedId: number,
    program: Program,
    studentType:StudentType,
    multipleBatchApplicable:boolean,
    academicYear:AcademicYear,
    batchNo:string,
    programScheduleCode:string,
    fromDate:string,
    toDate:string,
    localFee:number,
    foreignFee:number
}

export interface Program{
    programId: number,
    title: string,
    facultyId: Faculty,
    department:Department,

}

export interface Faculty{
    id: number,
    description: string
}

export interface Department{
    departmentId:number,
    description:string
}

export interface StudentType{
    id:number,
    description:string
}

export interface AcademicYear{
    id:number,
    year:string
}

export interface EntryExamSubComponent{
    id:number,
    description:string,
    entryExamComponent:EntryExamComponent,
}

export interface EntryExamComponent{
    id:number,
    entryExamMethod:entryExamMethod,
    entryExamComponentDetail:EntryExamComponentDetail
}

export interface entryExamMethod{
    id:number,
    description:string
}
export interface EntryExamComponentDetail{
    id:number,
    description:string,
    program:Program,
    entryExamComponentCategory:EntryExamComponentCategory
}

export interface EntryExamComponentCategory{
    id:number,
    description:string
}

export interface CenterCapacity{
    id:number,
    capacity:number,
    isAchieved:boolean,
    entranceExamCenterHall:EntranceExamCenterHall
}

export interface EntranceExamCenterHall{
    id:number,
    description:string
}

export interface EntranceExamTimeSlotTable1{
    ishidden:boolean,
    id:number,
    starttime:string,
    endTime:string,
    assigndate:string,
    programStarted:ProgramStarted,
    entryExamComponent:EntryExamComponent
}