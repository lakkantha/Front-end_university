export interface InitailStudent {
    id:number;
	programid:number;
	specilizationid:number
	academiccenterid:number;
	med_mediumId:number;

	namewithinitials:string;
	nic:string;
	correspondanceaddress:string;
	mobileno:string;

	email:string;
	admincenterid:number

	title:string;
    streamid:string;
    programentryqualificationid:string;
	faxno:string;
	mobileverified:string;
	emailverified:string;
	applicationtyped:number;
	


	programstartedid:number;

	program:{
		programid:number;
	}
}