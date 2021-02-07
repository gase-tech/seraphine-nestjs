import { Component, OnInit } from '@angular/core';
import { Message } from '@seraphine/api-interfaces';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Component({
  selector: 'seraphine-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  hello$: Observable<Message>;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    console.log('SessionComponent');
    this.hello$ = this.sessionService.hello();
  }
}
