import { Component, OnInit } from '@angular/core';
import { Resume, Skill } from '../../models/resume';

@Component({
  selector: 'app-defines-resources-capacity',
  templateUrl: './defines-resources-capacity.component.html',
  styleUrls: ['./defines-resources-capacity.component.css']
})
export class DefinesResourcesCapacityComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  resume = new Resume();
  
  addSkill() {
    console.log()
    this.resume.skills.push(new Skill());
  }

  myClick()
  {
    console.log(JSON.stringify(this.resume))
    console.log(this.resume.skills)
    console.log(this.resume.skills[0].value)
    console.log(this.resume.skills[1].value)

    this.resume.skills = [];
    this.resume.skills.push(new Skill());
  }

}
