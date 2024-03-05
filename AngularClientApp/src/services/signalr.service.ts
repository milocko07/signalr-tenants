import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: HubConnection | undefined;

  public isConnected: boolean = false;

  constructor() { }

  public startConnection(): void {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7254/chatHub') // Replace with your SignalR hub URL
      .build();

    this.connection
      .start()
      .then(_ => {
        console.log('SignalR chat connection started');
        this.isConnected = true;
      })
      .catch(err => {
        console.log(err);
        this.isConnected = false;
      });
  }

  public closeConnection(): void {
    if (this.connection) {
      this.connection
        .stop()
        .catch(err => {
          console.log(err);
          this.isConnected = false;
        });
    }
  }

  public joinGroup(groupName: string): void {
    if (this.connection) {
      this.connection.invoke('JoinGroup', groupName).catch(err => console.error(err));
    }
  }

  public sendMessage(message: string, groupName: string): void {
    if (this.connection) {
      this.connection.invoke('SendMessage', message, groupName).catch(err => console.error(err));
    }
  }

  public addReceiveMessageListener(callback: (message: string) => void): void {
    if (this.connection) {
      this.connection.on('receiveMessage', (message: string) => callback(message));
    }
  }
}
