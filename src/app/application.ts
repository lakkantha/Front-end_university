export interface Application
{
    id: number;
    program : {
        programId: number;
    }
    applicantType :{
        applicantTypeId: number;
    }
    prog_det: string;
    per_det: string;
    edu_qua: string;
    pro_qua: string;
    work_exp: string;   
}