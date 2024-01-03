import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  storeUserData(uid: string, email: string): Promise<void> {
    const userRef = this.db.object(`users/${uid}`);
    const userData = { uid, email, displayName: email.split('@')[0] };
    return userRef.set(userData);
  }

  getAllUsers(): Observable<any[]> {
    return this.db.list('users').valueChanges() as Observable<any[]>;
  }
  // _________________________________________________

  sendFriendRequest(senderId: string, receiverId: string): Promise<void> {
    const receiverRef = this.db.object(`friendsLists/${receiverId}/friendRequests/${senderId}`);
    return receiverRef.set(true);
  }

  acceptFriendRequest(userId: string, friendId: string): Promise<void[]> {
       const userRef = this.db.object(`friendsLists/${userId}/friends/${friendId}`);
    const friendRef = this.db.object(`friendsLists/${friendId}/friends/${userId}`);

    return Promise.all([
      userRef.set(true),
      friendRef.set(true),
    ]);
  }
}
