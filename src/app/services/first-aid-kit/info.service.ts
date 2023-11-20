import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, query, orderBy,where } from '@angular/fire/firestore';
import { FirstAidKitInfo } from './aidkit';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private firestore: Firestore) {}

  getFirstAidKitInfo(): Observable<FirstAidKitInfo[]> {
    const contactsCollection = collection(this.firestore, 'firstaid');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(contactsCollection, {idField: 'id'})
    .pipe(
      map(FirstAidKitInfo => FirstAidKitInfo as FirstAidKitInfo[])
    );
  }

  getFirstAidKitInfoById(id: string): Observable<FirstAidKitInfo> {
    const document = doc(this.firestore, `firstaid/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as FirstAidKitInfo;
      })
    );
  }
   // Add a method to get alphabetically sorted data
   getFirstAidKitInfoAlphabetically(): Observable<FirstAidKitInfo[]> {
    const herbsCollection = collection(this.firestore, 'firstaid');
    // Query to order data by the 'name' field (can replace 'name' with desired field)
    const alphabeticallySortedQuery = query(
      herbsCollection,
      orderBy('name')
    );

    // This method returns a stream of documents mapped to their payload and id
    return collectionData(alphabeticallySortedQuery, { idField: 'id' })
      .pipe(
        map(herbs => herbs as FirstAidKitInfo[])
      );
  }

  search(searchTerm: string): Observable<FirstAidKitInfo[]> {
    const herbsCollection = collection(this.firestore, 'firstaid');
    const squery = query(
      herbsCollection,
      orderBy('name'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );

    return collectionData(squery, { idField: 'id' }).pipe(
      map((info) => info as FirstAidKitInfo[])
    );
  }

  createFirstAidKitInfo(info:FirstAidKitInfo): Promise<void> {
    const document = doc(collection(this.firestore, 'firstaid'));
    return setDoc(document, info);
  }

  updateFirstAidKitInfo(info:FirstAidKitInfo): Promise<void> {
    const document = doc(this.firestore, 'firstaid', info?.id);
    const { id, ...data } = info;
    return setDoc(document, data);
  }

  deleteFirstAidKitInfo(id: string): Promise<void> {
    const document = doc(this.firestore, 'firstaid', id);
    return deleteDoc(document);
  }
}
