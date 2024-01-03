import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  setupMessageUpdates(userId: string, targetId: string, callback: (messages: any[]) => void): void {
    const chatPath = this.getChatPath(userId, targetId);

    this.db.list(chatPath).valueChanges().subscribe(messages => {
      callback(messages as any[]); 
    });
  }

  sendMessage(senderId: string, receiverId: string, content: string): Promise<void> {
    const messageId = this.db.createPushId();
    const timestamp = Date.now();
    const messageData = {
      content,
      senderId,
      receiverId,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    const chatPath = this.getChatPath(senderId, receiverId);

    const updates: { [key: string]: any } = {};
    updates[`${chatPath}/${messageId}`] = messageData;

    return this.db.object('/').update(updates);
  }

  private getChatPath(userId: string, targetId: string): string {
    const users = [userId, targetId].sort(); 
    return `messages/${users[0]}/${users[1]}`;
  }
}
