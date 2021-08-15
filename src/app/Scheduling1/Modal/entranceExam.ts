export interface entranceExam{
    id:number,
    centerName:string,
    address:string
}

export interface examRootCentre{
    id:number,
    description:string
}

export interface entranceExamBinding{
    examRootCenter:examRootCentre,
    entranceExamCenter:entranceExam
}