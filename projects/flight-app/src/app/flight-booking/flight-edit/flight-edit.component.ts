import { Observable, Observer } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ExitComponent } from '../../shared/exit/exit.guard';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, ExitComponent {

  id: string;
  showDetails: string;
  showWarning = false;
  sender: Observer<boolean>;

  metaData = [
    {
      name: 'id',
      label: 'Flight-Id',
      type: 'text'
    },
    {
      name: 'from',
      label: 'Airport of Departure',
      type: 'text'
    },
    {
      name: 'to',
      label: 'Airport of Destination',
      type: 'text'
    },
    {
      name: 'date',
      label: 'Flight Date',
      type: 'date'
    }
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      'from': ['Graz', Validators.required],
      'to': ['Hamburg'],
      'id': [''],
      'date': ['']
    });

    this.form.controls['id'].valueChanges.subscribe(newId => {
      if (newId === 4711) {
        this.form.patchValue({
          'from': 'Graz',
          'to': 'Tschibutti',
          'date': 'sofort!'
        })
      }
    });

    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  save(): void {
    console.debug('form: ', this.form.value);
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    this.sender.next(decision);
    this.sender.complete();
  }

  canExit(): Observable<boolean> {
    this.showWarning = true;
    return Observable.create((sender: Observer<boolean>) => {
      this.sender = sender;
    });
  }

  delete() {
    console.warn('Delete is not implemented yet!');
  }

}
