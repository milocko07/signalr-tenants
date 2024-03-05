import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from './../services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Tenants Chat';

  public signalRService: SignalRService | null = null;
  public tenants: string[] = ["Tenant1", "Tenant2"];
  public selectedTenant: string = "Tenant1";
  public isJoined: boolean = false;
  public userId: string = "";

  public message: string = '';
  messages: string[] = [];

  constructor(private service: SignalRService) {
    this.signalRService = service;
  }

  ngOnInit() {
    this.signalRService?.startConnection();
    this.signalRService?.addReceiveMessageListener((message) => {
      this.messages.push(message);
    });
  }

  joinGroup() {
    this.signalRService?.joinGroup(this.selectedTenant);
    this.isJoined = true;
    this.userId = this.generateRandomString();
  }

  sendMessage() {
    if (!this.message || !this.message.trim()) {
      return;
    }
    this.signalRService?.sendMessage(this.message + " by user " + this.userId, this.selectedTenant);
    this.message = '';
  }

  generateRandomString(length: number = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ngOnDestroy() {
    this.signalRService?.closeConnection();
  }
}
