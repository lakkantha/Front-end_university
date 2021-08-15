import { AddPrograms } from "../Modal/AddPrograms";
import {studentType} from "../Modal/scheduling-dop";

export interface ActivityPrograms{
    ActivityName : string;
    ActivityDateType : string;
    CenterType : string;
    CenterName : string;
    ApplicableStudentTypeNew : string;
    ApplicableStudentTypeRe : string;
    program : AddPrograms[];
}

export interface defineActivity{
    name: string;
    activityId:number;
    activityDateType:activityDateType[];
}

export interface rgmCenters{
    cnt_description: string;
    ctp_centerTypeId: number;
    cnt_centerId: number;
}

export interface rgmCenterType{
    id:number;
}

export interface activityDateType{
    id: number;
    type: string;
}

export interface activityPrograms{
    programId: number;
    code: string;
    title:string;
    facultyId: number;
    department: number;
}



export interface activitySatrt{
    id: number,
    activity: defineActivity,
    activityDateType: activityDateType,
    centerType: rgmCenterType,
    rgmCenter: rgmCenters,
    studentType: studentType
}