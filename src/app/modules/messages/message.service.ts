import { Injectable } from '@angular/core';
import {Message} from "./message/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  add(message: Message) {
    this.messages.push(message);
  }
  addAll(messages: Message[]) {
    messages.forEach(
      (msg) => this.messages.push(msg)
    );
  }
  clear(message: Message) {
    const index: number = this.messages.findIndex(
      (msg) => (msg.id === message.id)
    )
    this.messages.splice(index,1);
  }
  clearAll() {
    this.messages = [];
  }
}
