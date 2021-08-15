export interface getPostalCodeAdministrativeCenter{
    id:number,
    rgtAdminCenter:rgtAdminCenter
}

export interface rgtAdminCenter{
    adc_adminCenterId:number,
    adc_description:string
}

export interface getAcademicCenter{
    programstartedacademiccenterid: number,
    cnt_center:cnt_center,
    rgtAdminCenter:rgtAdminCenter
}

export interface cnt_center{
    id:number,
    description:string
}

export interface getProgramMedium{
    id:number,
    medium:medium
}

export interface medium{
    mediumId:number,
    description:string
}