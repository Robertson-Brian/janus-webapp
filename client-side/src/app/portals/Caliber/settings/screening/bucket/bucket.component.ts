import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BucketsService } from '../services/buckets.service';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../entities/Question'
import { Bucket } from '../entities/Bucket'
import { SkillTypesService } from '../services/skillTypes.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  questionList;
  theBucket: Bucket;
  constructor(
    private bucketService: BucketsService,
    private modalService: NgbModal,
    private questionService: QuestionsService) {

  }

  ngOnInit() {
    this.questionList = [
      { id: 1, text: "test", answers: ["1", "2"], tagIds: [1, 2], isActive: true }
    ]

    this.getCurrentBucket();
  }

   open(content) {
    this.modalService.open(content);
    event.stopPropagation();
  }

  getCurrentBucket(){
   this.theBucket=this.bucketService.getCurrentBucket();
    return this.theBucket;

  }
   addBucket(name: String, description: String) { }
  // public addQuestion() {};
  //public editQuesiton(){};
  //public deactivateQuestion(){};

  setBucketName(name: string) {
    this.bucketService.setName(name);
  }

  setBucketDescription(desc: string) {
    this.bucketService.setDescription(desc);
  }

   showQuestionsForThisBucket() {
     let bucketID: number = this.bucketService.getCurrentBucket().bucketId;
    // this.questionService.getBucketQuestions(bucketID);
    // Mock data
    //this.questionService.getBucketQuestions(bucketID);
    this.questionService.getBucketQuestions(bucketID);

  };
}
