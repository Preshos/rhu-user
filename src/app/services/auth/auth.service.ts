import { Injectable } from '@angular/core';
import { 
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  UserInfo, 
  UserCredential} from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { catchError, from, map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { Firestore,collection, doc, docData, setDoc } from '@angular/fire/firestore';
import { ProfileUser } from '../users/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  currenUser$ = authState(this.auth);

  constructor(private auth: Auth,
    private alertController: AlertController,
    private firestore:Firestore) {}

    async showAlert(header: string, message: string): Promise<void> {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK'],
        cssClass: 'custom-alert',
      });
      await alert.present();
    }


    login(email, password): Observable<UserCredential> {
      return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
        switchMap((userCredential) => {
          // Check if the user is an admin
          return this.checkAdminStatus(userCredential.user.uid).pipe(
            take(1),
            map((isAdmin) => {
              if (!isAdmin) {
                console.log('User logged in:', userCredential.user.email);
              } else {
                console.log('Admin logged in:', userCredential.user.email);
              }
              return userCredential;
            })
          );
        })
      );
    }
    
    signup(email: string, password: string): Observable<UserCredential> {
      return from(createUserWithEmailAndPassword(this.auth, email, password));
    }


    isAdmin$ = authState(this.auth).pipe(
      switchMap((user) => {
        if (user?.uid) {
          const userDocRef = doc(this.firestore, 'users', user.uid);
          return docData(userDocRef).pipe(
            map((userData: ProfileUser) => !!userData.isAdmin),
            catchError(() => of(false))
          );
        } else {
          return of(false);
        }
      })
    );

    // Method to check if the user is an admin
    public checkAdminStatus(uid: string): Observable<boolean> {
      const userDocRef = doc(this.firestore, 'users', uid);
      return docData(userDocRef).pipe(
        map((userData: ProfileUser) => !!userData.isAdmin),
        catchError(() => of(false))
      );
    }
  
    // Method to update user profile (including isAdmin property)
    private updateUserProfile(uid: string, data: any): Observable<void> {
      const userDocRef = doc(this.firestore, 'users', uid);
      return from(setDoc(userDocRef, data, { merge: true }));
    }

    logout(): Observable<any> {
      return from(this.auth.signOut()).pipe(
        switchMap(() => {
          // Reload the app after logout
          window.location.reload();
          // Return an observable that never emits to complete the stream
          return new Observable();
        })
      );
    }

  resetpassword(email):Observable<any>{
    return from (sendPasswordResetEmail(this.auth,email));
  }

  sendEmailVerification(): Observable<void> {
    const user = this.auth.currentUser;
    return from(sendEmailVerification(user));
  }

  updateFirestoreOnEmailVerification(userUid: string): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', userUid); // Assuming 'users' is your collection name
    return setDoc(userDocRef, { emailverified: true }, { merge: true });
  }
  
}
