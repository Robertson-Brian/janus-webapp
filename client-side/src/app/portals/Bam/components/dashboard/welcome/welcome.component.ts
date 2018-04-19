import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BamUser } from '../../../models/bamuser.model';
import { Batch } from '../../../models/batch.model';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../../services/alert.service';

/**
 * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
 * Welcome component to handle the welcome view
 */

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public currentUser: BamUser;
  private message: String;
  public batchCount: number;
  private batches: Batch[];
  private selectedBatch: Batch;

  constructor(
    private batchService: BatchService, private sessionService: SessionService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.currentUser = this.sessionService.getUser();
    if (this.sessionService.getSelectedBatch()) {
      this.selectedBatch = this.sessionService.getSelectedBatch();
      this.sessionService.putSelectedBatchIntoSession(this.selectedBatch);
      this.getInProgressBatches();
    } else {
      this.getInProgressBatches();
    }
  }

  /**
   * Function to get in-progress batches using the batches service.
   * and setting the response data to batches array.
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   */
  getInProgressBatches() {
    this.batchService.getAllBatchesInProgress(this.currentUser.email).subscribe(
      response => {
        this.batches = response;
        if (this.batches !== null) {
          this.batchCount = this.batches.length;
        } else {
          this.batchCount = 0;
        }
        this.setAllNeededVars();
      });
  }

  /**
   * When a batch gets selected, it will put the selected batch into session.
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   */
  setSelected() {
    this.sessionService.putSelectedBatchIntoSession(this.selectedBatch);
  }

  /**
   * To set all needed varables for the welcome component
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve\
   */
  setAllNeededVars() {
    if (this.batchCount > 1) {
      this.message = 'You have more than one current batch';
    } else if (this.batchCount === 1) {
      this.selectedBatch = this.batches.pop();
      this.sessionService.putSelectedBatchIntoSession(this.selectedBatch);
    } else {
      this.batchCount = 0;
      this.message = 'You have no current batches';
    }
  }

  /**
   * To compare batches for selected batch.
   * @returns true if batches match , false otherwise.
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   */
  compareBatch(b1: Batch, b2: Batch): boolean {
    return b1 && b2 ? b1.id === b2.id : b1 === b2;
  }

}
