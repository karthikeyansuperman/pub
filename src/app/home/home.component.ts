import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';
import { MessageService } from '../shared/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  {
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

  onChatTargetClick(targetUser: any): void {
    this.chatTarget = targetUser;
  }

  sendFriendRequest(targetUser: any): void {
    const senderId = this.user.uid;
    const receiverId = targetUser.uid;

    // Call the service method to send a friend request
    this.userService.sendFriendRequest(senderId, receiverId)
      .then(() => {
        console.log('Friend request sent successfully');
        // Optionally, you can update the UI or provide feedback to the user
      })
      .catch(error => {
        console.error('Error sending friend request:', error);
      });
  }

  acceptFriendRequest(senderId: string): void {
    const userId = this.user.uid;

    // Call the service method to accept a friend request
    this.userService.acceptFriendRequest(userId, senderId)
      .then(() => {
        console.log('Friend request accepted successfully');
        // Optionally, you can update the UI or provide feedback to the user
      })
      .catch(error => {
        console.error('Error accepting friend request:', error);
      });
  }
}
