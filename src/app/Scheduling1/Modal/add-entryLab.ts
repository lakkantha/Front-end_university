export class AddEntryLab {

    ExamLab:String;
  
    Medium :string;
    capacity:any;
}

export interface BindingTable2{
    id:number,
    assigndate:string,
    starttime:string,
    endTime:string,
    programEntryExamMethod:{
        entryExamMethod:{
            id:number,
            description:string
        }
    }
}

export interface getEntranceExamCenters{
    examRootCenterEntranceExamCenterPK:{
        examRootCenterId:number,
        entranceExamCenterId:number
    },
    examRootCenter:{
        description:string,
        id:number
    },
    entranceExamCenter:{
        id:number,
        centerName:string
    }
}

export interface AddingExamCenters{
    id:number,
    qtyPerLab:number,
    examMediumsList:[{
        medium:string
    }],
    entranceExamCenterHall:{
        entranceExamCenter:{
            centerName:string,
            id:number
        }
        description:string,
        id:number,
        capacity:number
    },
    programSchedulesselectionmethoddateandtimeTable2:{
        id:number
    }
}
