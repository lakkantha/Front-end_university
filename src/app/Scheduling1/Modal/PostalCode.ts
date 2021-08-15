export interface Province{
    id : number,
    description : string
    
}

export interface District{
    id: number,
    description: string,
    Province:{
        ProvinceId:number
    }
}

export interface City{
    id: number,
    description: string,
    District:{
        DistrictId:number;
    }
    Province:{
        ProvinceId:number
    }
}

export interface Administrative_Center{
    adc_adminCenterId: number,
    adc_description: string
}