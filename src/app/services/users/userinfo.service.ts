import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileUser } from './user';
import { collection,collectionData,doc,docData,docSnapshots,Firestore,getDoc,orderBy,query,setDoc,updateDoc } from '@angular/fire/firestore';
import { Observable,filter,from,map,of,switchMap,shareReplay, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private cachedProfileUsers$: Observable<ProfileUser[]>;

  constructor(private firestore:Firestore,private authService : AuthService) { }

  get currentUserProfile$():Observable<ProfileUser | null>{
    return this.authService.currenUser$.pipe(
      switchMap((user) =>{
        if (!user?.uid){
          return of (null);
        }
        const ref = doc(this.firestore,'users',user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  getUserById(uid: string): Observable<ProfileUser> {
    const document = doc(this.firestore, `users/${uid}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const uid = doc.id;
        const data = doc.data();
        return { uid, ...data } as ProfileUser;
      })
    );
    }


    getTotalUsersCount(): Observable<number> {
      const contactsCollection = collection(this.firestore, 'users');
      return collectionData(contactsCollection, { idField: 'id' })
        .pipe(
          map(contacts => contacts.length)
        );
    }

    getProfileUser(): Observable<ProfileUser[]> {
      const contactsCollection = collection(this.firestore, 'users');
      // this method returns a stream of documents mapped to their payload and id
      return collectionData(contactsCollection, {idField: 'id'})
      .pipe(
        map(contacts => contacts as ProfileUser[])
      );
    }

    getProfileUserAlphabetically(): Observable<ProfileUser[]> {
      const herbsCollection = collection(this.firestore, 'users');
      const alphabeticallySortedQuery = query(herbsCollection, orderBy('firstname'));
  
      // Return a new Observable reference
      return collectionData(alphabeticallySortedQuery, { idField: 'id' })
        .pipe(
          map(users => users as ProfileUser[]),
          shareReplay(1)
        );
    }
    
  //   getProfileUserAlphabetically(): Observable<ProfileUser[]> {
  //   if (!this.cachedProfileUsers$) {
  //     const herbsCollection = collection(this.firestore, 'users');
  //     const alphabeticallySortedQuery = query(herbsCollection, orderBy('displayname'));

  //     this.cachedProfileUsers$ = collectionData(alphabeticallySortedQuery, { idField: 'id' })
  //       .pipe(
  //         map(users => users as ProfileUser[]),
  //         shareReplay(1) // Cache the result and replay it for subsequent subscribers
  //       );
  //   }

  //   return this.cachedProfileUsers$;
  // }

  //clearing the cache of angular
  // clearProfileUserCache() {
  //   this.cachedProfileUsers$ = null;
  // }

 
  updateUser (user : ProfileUser) : Observable<any>{
    const ref = doc(this.firestore, 'users', user.uid);
    return from (updateDoc(ref,{...user}));
  }

  addUser (user : ProfileUser) : Observable<any>{
    const ref = doc(this.firestore, 'users', user.uid);
    return from (setDoc(ref,user));
  }

  updateUserStatusOnline(uid: string): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return setDoc(userDocRef, { isOnline: true }, { merge: true });
  }

  updateUserStatusOffline(uid: string): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return setDoc(userDocRef, { isOnline: false }, { merge: true });
  }

  getOnlineStatus(uid: string): Observable<boolean> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return docData(userDocRef).pipe(
      map((userData: any) => userData?.isOnline === true),
      catchError(() => of(false))
    );
  }
  
  // updateUser (user : ProfileUser) : Observable<any>{
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from (updateDoc(ref,{...user}));
  // }
    // addUser(user : ProfileUser): Promise<void> {
  //   const document = doc(collection(this.firestore, 'users', user.uid));
  //   return setDoc(document, user);
  // }
}
