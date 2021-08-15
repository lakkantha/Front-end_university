import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupingComponent } from './components/grouping/grouping.component';
import { DefineStudentsGroupsComponent } from './components/define-students-groups/define-students-groups.component';
import { ViewCourseStructureComponent } from './components/view-course-structure/view-course-structure.component';
import { CreateGroupsComponent } from './components/create-groups/create-groups.component';
import { AssignGroupsGroupableComponentComponent } from './components/assign-groups-groupable-component/assign-groups-groupable-component.component';
import { DefinesResourcesCapacityComponent } from './components/defines-resources-capacity/defines-resources-capacity.component';

const routes: Routes = [

  {
    path: '',
    component: GroupingComponent
  },
  {
    path : "define-students-groups",
    component : DefineStudentsGroupsComponent
  },
  {
    path : "view-course-structure",
    component : ViewCourseStructureComponent
  },
  {
    path : "create-groups",
    component : CreateGroupsComponent
  },
  {
    path : "groups-to-group-able-component",
    component : AssignGroupsGroupableComponentComponent
  },
  {
    path : "defines-resources-capacity-component",
    component : DefinesResourcesCapacityComponent
  },
  {
    path : "**",
    component : GroupingComponent
  }
];

@NgModule({
  declarations: [DefineStudentsGroupsComponent, GroupingComponent, ViewCourseStructureComponent, CreateGroupsComponent, AssignGroupsGroupableComponentComponent, DefinesResourcesCapacityComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentsGroupingModule { }
