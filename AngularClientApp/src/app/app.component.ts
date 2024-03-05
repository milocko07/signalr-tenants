import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from './../services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Tenants App';

  message: string = '';
  groupName: string = 'general';
  messages: string[] = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addReceiveMessageListener((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.signalRService.closeConnection();
  }

  joinGroup() {
    this.signalRService.joinGroup(this.groupName);
  }

  sendMessage() {
    if (!this.message || !this.message.trim()) {
      return;
    }
    this.signalRService.sendMessage(this.message, this.groupName);
    this.message = '';
  }
}
