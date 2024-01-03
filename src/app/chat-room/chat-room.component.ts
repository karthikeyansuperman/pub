// chat-room.component.ts

import { Component} from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';
import { MessageService } from '../shared/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  user: any;
  users: any[] = [];
  chatTarget: any;
  messages: any[] = [];
  newMessage: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.loadUsers();
        this.setupMessageUpdates();
      }
    });
  }

  ngOnInit(): void {
    const initialChatTarget = null; // or {} for an empty object
    this.onChatTargetClick(initialChatTarget);
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(u => u.uid !== this.user?.uid);
    });
  }

  setupMessageUpdates(): void {
    if (this.user && this.chatTarget) {
      const userId = this.user.uid;
      const chatTargetId = this.chatTarget.uid;

      this.messageService.setupMessageUpdates(userId, chatTargetId, (messages: any[]) => {
        this.messages = messages;
      });
    }
  }
  
  onSignOutClick(): void {
    console.log('Sign out clicked');
    this.authService.signOut()
      .then(() => {
        console.log('Sign out successful');
        this.router.navigate(['/sign-in']);
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  }

  onChatTargetClick(targetUser: any): void {                    
    this.chatTarget = targetUser;
    this.setupMessageUpdates();
  }

  onSendMessageClick(): void {
    if (!this.chatTarget || !this.chatTarget.uid) {
      console.error('No chat target selected');
      return;
    }
  
    this.messageService.sendMessage(this.user.uid, this.chatTarget.uid, this.newMessage)
      .then(() => this.newMessage = '')
      .catch(error => console.error('Error sending message:', error));
  }

}
