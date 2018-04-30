import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPoolComponent } from './topic-pool.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { Topic } from '../../../models/topic.model';
import { SubtopicService } from '../../../services/subtopic.service';
import { Observable } from 'rxjs/Observable';
import { SubtopicCurric } from '../../../models/subtopicCurric.model';

fdescribe('TopicPoolComponent', () => {
  let component: TopicPoolComponent;
  let fixture: ComponentFixture<TopicPoolComponent>;

  let parentTopic: Topic;
  let notParentTopic: Topic;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {

    parentTopic = {topicID: 256, topicName: 'Parent Topic'};
    notParentTopic = {topicID: 512, topicName: 'notParentTopic'};

    const subtopicService: SubtopicService = TestBed.get(SubtopicService);

    spyOn(subtopicService, 'getAllSubtopics').and.returnValue(Observable.of<SubtopicCurric[]>([
      {date: {day: 0, endTime: 1, startTime: 0, week: 6}, parentTopic: parentTopic, status: 'inProgress',
      subtopicId: 0, subtopicName: 'Subtopic 1'},
      {date: {day: 1, endTime: 1, startTime: 0, week: 6}, parentTopic: parentTopic, status: 'complete',
      subtopicId: 0, subtopicName: 'Subtopic 2'},
      {date: {day: 2, endTime: 1, startTime: 0, week: 6}, parentTopic: parentTopic, status: 'upcoming',
      subtopicId: 0, subtopicName: 'Subtopic 3'},
    ]
    ));

    fixture = TestBed.createComponent(TopicPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should set the topics array to contain the same values as the subTopicName array', () => {
    const Topics: Array<Topic> = [{ topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, { topicID: 2, topicName: 'ThirdTopic' }];

    component.subTopicName = Topics;
    component.initTopics();

    expect(component.topics).toEqual(['FirstTopic', 'SecondTopic', 'ThirdTopic']);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should return true if the specified Topic appears only once in the array', () => {
    const tempTopic: Topic = new Topic();

    tempTopic.topicName = 'ThirdTopic';
    tempTopic.topicID = 2;

    const Topics: Array<Topic> = [{ topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, tempTopic, { topicID: 3, topicName: 'FourthTopic' }];

    const boolean = component.onlyUnique(tempTopic, 2, Topics);

    expect(boolean).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should return false if the specified index is not the first time the specified Topic appears in the array', () => {
    const tempTopic: Topic = new Topic();

    tempTopic.topicName = 'ThirdTopic';
    tempTopic.topicID = 2;

    const Topics: Array<Topic> = [{ topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, tempTopic, { topicID: 3, topicName: 'FourthTopic' }, tempTopic];

    const boolean = component.onlyUnique(tempTopic, 4, Topics);

    expect(boolean).toBeFalsy();
  });

  /**
  * @author Holden Olivier
  * @batch 1803 usf
  */
  it('should return an array of unique Topics', () => {
    const Topics: Array<string> = ['FirstTopic',
      'SecondTopic',
      'ThirdTopic',
      'FourthTopic',
      'ThirdTopic',
      'SixthTopic'];

    const filteredTopics = Topics.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    component.topics = Topics;
    component.uniqueTopics();

    expect(component.uniqarrFiltered).toEqual(filteredTopics);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should fill subTopicArray with arrays representing the subtopics of all topics represented within subTopicName', () => {
    const Topics: Array<Topic> = [notParentTopic, { topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, parentTopic, { topicID: 2, topicName: 'ThirdTopic' }];

    component.subTopicName = Topics;

    component.getSubTopics();

    const expected: SubtopicCurric[][] = [
      [],
      [],
      [],
      [
        {date: {day: 0, endTime: 1, startTime: 0, week: 6}, parentTopic: parentTopic, status: 'inProgress',
        subtopicId: 0, subtopicName: 'Subtopic 1'},
        {date: {day: 1, endTime: 1, startTime: 0, week: 6}, parentTopic: parentTopic, status: 'complete',
        subtopicId: 0, subtopicName: 'Subtopic 2'},
        {date: {day: 2, endTime: 1, startTime: 0, week: 6}, parentTopic: parentTopic, status: 'upcoming',
        subtopicId: 0, subtopicName: 'Subtopic 3'}
      ],
      []
    ];

    expect(component.subTopicArray.length === 1);
    expect(component.subTopicArray).toEqual(expected);
  });
});
