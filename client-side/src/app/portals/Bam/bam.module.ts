import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BamRoutingModule } from './bam-routing.module';
import { BamComponent } from './bam.component';
import { BatchProgressBarComponent } from './components/dashboard/batch-progress-bar/batch-progress-bar.component';
import { HomeComponent } from './components/home/home.component';
import { MainCurriculumViewComponent } from './components/curriculum-editor/main-curriculum-view/main-curriculum-view.component';
import { TopicPoolComponent } from './components/curriculum-editor/topic-pool/topic-pool.component';
import { CurriculumService } from './services/curriculum.service';
import { SessionService } from './services/session.service';
import { UsersService } from './services/users.service';
import { DashboardinfoComponent } from './components/dashboard/dashboardinfo/dashboardinfo.component';
import { WelcomeComponent } from './components/dashboard/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { BatchService } from './services/batch.service';
import { LoadingSpinnerComponent } from './components/dashboard/ui/loading-spinner/loading-spinner.component';
import { CalendarService } from './services/calendar.service';

@NgModule({
  imports: [
    CommonModule,
    BamRoutingModule,
    FormsModule
  ],
  declarations: [
    BamComponent,
    HomeComponent,
    MainCurriculumViewComponent,
    TopicPoolComponent,
    BatchProgressBarComponent,
    LoadingSpinnerComponent,
    WelcomeComponent,
    DashboardinfoComponent
  ],
  providers: [
    BatchService,
    UsersService,
    SessionService,
    CalendarService,
    CurriculumService
  ]
})
export class BamModule { }
