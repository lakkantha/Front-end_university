export interface ApplicationStatistics{
    id:number,
    programStarted:programStarted,
    programStartedAcedemicCenter:programStartedAcedemicCenter,
    rgtAdminCenter:rgtAdminCenter,
    medium:medium,
    nic:string,
    correspondanceaddress:string,
    namewithinitials:string,
    mobileno:string,
    email:string,
    applicantType:applicantType
}
export interface programStarted{
    programStartedId:number,
    program:program,
    studentType:studentType,
    academicYear:academicYear,
    batchNo:string,
    programScheduleCode:string,
    fromDate:string,
    toDate:string,
    localFee:number,
    foreignFee:number
}
export interface program{
    programId:number,
    code: string,
    title:string
}
export interface studentType{
    id:number,
    description:string
}
export interface academicYear{
    id:number,
    year:string
}
export interface programStartedAcedemicCenter{
    programstartedacademiccenterid:number,
    programstarted:programStarted,
    cnt_center:cnt_center
}
export interface cnt_center{
    cnt_centerId:number,
    cnt_code:string,
    cnt_description:string,
    ctp_centerTypeId:string,
    cnt_regionalCenterId:number,
    rgtAdminCenter:rgtAdminCenter,
}
export interface rgtAdminCenter{
    adc_adminCenterId:number,
    adc_description:string
}
export interface medium{
    mediumId:number,
    description:string
}
export interface applicantType{
    id:number,
    description:string
}