
export interface ProgramStarted1{
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

export interface ProgramEntryExam{
    id:number,
    entryExamType:EntryExamType
}

export interface EntryExamType{
    id:number,
    description:string
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