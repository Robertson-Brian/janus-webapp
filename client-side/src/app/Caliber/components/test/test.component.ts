import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BatchService } from '../../services/batch.service';
import { TrainerService } from '../../services/trainer.service';
import { TraineeService } from '../../services/trainee.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private service: TraineeService;


  constructor(trainerService: TraineeService) {
    this.service = trainerService;
  }

  private log(object: any): void {
    console.log(object);
  }

  ngOnInit() {
    this.subscription = this.service.getList().subscribe( (batches) => {
      this.log(batches);
    });

    // this.service.fetchAll();
    this.service.fetchAllByBatch(3002);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
