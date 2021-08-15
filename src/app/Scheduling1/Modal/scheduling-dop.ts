import {rgmCenters,defineActivity,activityDateType} from './ActivityPrograms'

export interface Faculties{
    id: number,
    description: string,

}

export interface Departments{
    departmentId: number,
    description: string,
}

export interface Units{
    id: number,
    description:string,
}

export interface Programs{
    programId: number,
    title:string,
}

export interface AcademicYear{
    id: number,
    year: string,
}

export interface studentType{
    id: number
}
export interface ActivityStarted{
    id: number,
    centerType:number,
    rgmCenter: rgmCenters[],
    activity:defineActivity,
    activityDateType:activityDateType,
    studentType:studentType,
    program:Programs
}

export interface DefineActivityStarted{
    activityStarted:ActivityStarted,
    accessiblePerson:any,
    accessType:AccessType,
    calenderType:calenderType,
    id:number,

}

export interface AccessType{
    id:number,
    accessTypeName:string
}
export interface calenderType{
    calenderTypeName:string,
    id:number,
}
export interface ProgramStarted{
    programScheduleCode: string,
    programStartedId: number,
    program: Programs[]
    studentType: studentType
}

export interface ActivityCenterDate{
    fromDate: string,
    toDate: string,
    activityCenterDateDateLists:ActivityCenterDateDateLists[],
    rgmCenter:rgmCenters,
    activity:defineActivity,
    programStarted:ProgramStarted,
    id:number
}

export interface ActivityCenterDateDateLists{
    id:number,
    date:string
}
export interface ActivityProgramDate{
    programStarted:ProgramStarted,
    activity:defineActivity,
    dateFrom: string,
    dateTo:string,
    id:number;
}