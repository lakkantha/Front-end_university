import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateGroupsServiceService } from '../../services/create-groups-service.service'

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.css']
})
export class CreateGroupsComponent implements OnInit {
  GroupData: any;
  
  programs: any;
  specialization: any;
  discipline: any;
  stream: any;
  course: any;
  center: any;
  medium: any;

  message:any;
  constructor(private api:CreateGroupsServiceService,private router: Router)
  {
    this.getProgramService()
    this.getOfferingTypeService()
    this.getDayTypeService()
  }

  ngOnInit(): void {
    this.recommendedListGenerationCheck = true
    this.GroupData = {}
  }

  form = new FormGroup({
    programme: new FormControl('', Validators.required),
    specialization: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    center: new FormControl('', Validators.required),
    medium: new FormControl('', Validators.required),
    groupName: new FormControl('', Validators.required),
    groupCount: new FormControl('', Validators.required),
    groupCapacity: new FormControl('', Validators.required)
  });

  myForm = new FormGroup({
    expandGroup: new FormControl('', Validators.required)
  });


  get f(){
    return this.form.controls;
  }
  exit()
  {
    this.router.navigate(['student-group']);
  }


  getProgramService()
  {
    this.api.getProgramsService().subscribe(
      response => this.programs = response
    )
  }

  programStartedId
  programId
  getAllDataDependOnProgram(id)
  {
    for (let i of this.programs)
    {
      if(id == i.programStartedId)
      {
        console.log(id)
        this.programStartedId = id
        this.programId = i.programId

        console.log(this.programId)
        this.api.getSpecializationService(this.programId).subscribe(
          response => this.specialization = response
        )

        this.api.getDisciplineService(this.programId).subscribe(
          response => this.discipline = response
        )
        console.log(this.discipline)

        this.api.getStreamService(this.programId).subscribe(
          response => this.stream = response
        )
        console.log(this.stream)

        this.api.getCourseService(this.programId).subscribe(
          response => this.course = response
        ) 
      }
    }

    this.getCenterService(id)
  }
  
  getCenterService(id)
  {
    this.api.getCenterService(id).subscribe(
      response => this.center = response
    )
  }


  submit()
  {
    console.log(this.form.value);

    let pass = this.form.value;
    pass['programStarted'] = {
      'programStartedId' : this.form.value['programme']
    }
    delete pass['programme']

    pass['courses'] = {
      'id' : this.form.value['course']
    }
    delete pass['course']


    pass['rgmCenter'] = {
      'cnt_centerId' : this.form.value['center']
    }
    delete pass['center']

    pass['rgpMedium'] = {
      'med_mediumId' : this.form.value['medium']
    }
    delete pass['medium']

    this.api.createGroup(this.form.value).subscribe(
      Response => {
        this.message = "Successfully Added.";
        document.getElementById("success").click();
      },
      Error => {
        if (Error.status === 200)
        {
          this.message = "Successfully Added.";
          document.getElementById("success").click();
        }
        else
        {
          this.message = "Something Error";
          document.getElementById("error").click();
        }
        
      }
    )
  }


  // expand
  createGroupValue = {
    programme: '',
    specialization: '',
    course:'',
    center:'',
    medium:'',
    expandGroup:''
  }
  expand()
  {
    this.createGroupValue.programme = this.form.controls['programme'].value
    this.createGroupValue.specialization = this.form.controls['specialization'].value
    this.createGroupValue.course = this.form.controls['course'].value
    this.createGroupValue.center = this.form.controls['center'].value
    this.createGroupValue.medium = this.form.controls['medium'].value
    this.createGroupValue.expandGroup = this.myForm.controls['expandGroup'].value
    console.log(this.createGroupValue)

    this.api.expandGroup(this.createGroupValue).subscribe(
      Response => {
        this.message = "Successfully Group value Expanded";
        document.getElementById("success").click();
        this.myMediumChange(this.mediumId)
      },
      Error => {
        this.message = "Group value isn't Expanded";
        document.getElementById("error").click();
      }
    )
  }


  groupName: string = "";
  centerCode: string = "";
  myCenterChange(id)
  {
    console.log(id)
    this.api.getMediumService(this.programStartedId,id).subscribe(
      response => this.medium = response
    )

    for (let i of this.center)
    {
      if(id == i.cnt_center_id)
      {
        var str = i.abbrivation
        this.centerCode = str
        console.log(this.centerCode)
      }
    } 
  }

  mediumCode: string = "";
  mediumId: any
  myMediumChange(id)
  {
    console.log(this.form.value)
    this.api.getGroup(this.form.value).subscribe(
      response =>
      {
        console.log(response);
        this.GroupData = response;
        this.form.controls['groupName'].setValue(this.GroupData.groupName)
        this.form.controls['groupCount'].setValue(this.GroupData.groupCount)
        this.form.controls['groupCapacity'].setValue(this.GroupData.groupCapacity)
      }
    )
    this.mediumId = id
    this.GroupData = []
    for (let i of this.medium)
    {
      if(id == i.med_medium_id)
      {
        var str = i.med_description
        this.mediumCode = str.charAt(0)
        console.log(this.mediumCode)

        this.groupName = this.centerCode + this.mediumCode
        console.log(this.groupName)
      }
    }
  }


  recommendedListGenerationCheck=false;









  // group Setting

  offeringTypes
  getOfferingTypeService()
  {
    this.api.getOfferingType().subscribe(
      response => this.offeringTypes = response
    )
  }

  dayTypes
  getDayTypeService()
  {
    this.api.getDayType().subscribe(
      response => this.dayTypes = response
    )
  }
  

  settingForm = new FormGroup({
    createGroupId: new FormControl('', Validators.required),
    groups: new FormControl('', Validators.required),
    offeringType: new FormControl('', Validators.required),
    dayType: new FormControl('', Validators.required),
    expandCapacity: new FormControl('', Validators.required),
    hiddenGroup: new FormControl('', Validators.required)
  });

//expand Group capacity
  expandGroupCapacity = {
    programme: '',
    specialization: '',
    course:'',
    center:'',
    medium:'',
    expandGroupCapacity:''
  }
  saveGroupSetting()
  {
    this.settingForm.controls['createGroupId'].setValue(this.GroupData.id)
    let pass = this.settingForm.value;
    pass['createGroup'] = {
      'id' : this.settingForm.value['createGroupId']
    }
    delete pass['createGroupId']

    pass['am_m_offeringType'] = {
      'offOfferingTypeId' : this.settingForm.value['offeringType']
    }
    delete pass['offeringType']

    pass['am_m_dayType'] = {
      'dayDayTypeId' : this.settingForm.value['dayType']
    }
    delete pass['dayType']


    console.log(this.settingForm.value)

    this.api.groupSetting(this.settingForm.value).subscribe(
      Response => {
        console.log(Response);
        alert("Successfully Added Group Setting");
        this.expandGroupCapacityMy()
      },
      Error => {
        if (Error.status === 500)
        {
          console.log(Error)
          this.expandGroupCapacityMy()
          alert("Already Added Group Setting");
          
        }
        else
        {
          console.log(Error)
          alert("Something Error");
        }
      }
    )
  }

  expandGroupCapacityMy()
  {
    this.expandGroupCapacity.programme = this.form.controls['programme'].value
    this.expandGroupCapacity.specialization = this.form.controls['specialization'].value
    this.expandGroupCapacity.course = this.form.controls['course'].value
    this.expandGroupCapacity.center = this.form.controls['center'].value
    this.expandGroupCapacity.medium = this.form.controls['medium'].value
    this.expandGroupCapacity.expandGroupCapacity = this.settingForm.controls['expandCapacity'].value

    console.log(this.expandGroupCapacity);
    this.api.expandGroupCapacity(this.expandGroupCapacity).subscribe(
      Response => {
        console.log(Response);
        alert("Expanded Group Capacity");
        this.myMediumChange(this.mediumId)
      },
      Error => {
        console.log(Error)
        alert("Group Capacity isn't Expand");
      }
    )
  }

}
