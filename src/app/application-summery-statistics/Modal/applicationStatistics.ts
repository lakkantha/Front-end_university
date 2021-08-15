
export interface forExcel{
    centerName:string,
    sequence:Sequence[]
}

export interface Sequence{
    sequencName:string,
    studentData:Student[]
}

export interface Student{
    id:number,
    nic:string,
    namewithinitials:string,
    email:string,
    mobileno:string
}

export interface forSequence{
    center:string,
    count:number,
    identity:number
}
