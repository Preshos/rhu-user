import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, query, orderBy,where } from '@angular/fire/firestore';
import { FirstAidInfo } from './firstaid';

@Injectable({
  providedIn: 'root'
})
export class FirstaidService {
  constructor(private firestore: Firestore) {}

  getFirstAidInfo(): Observable<FirstAidInfo[]> {
    const contactsCollection = collection(this.firestore, 'basic_firstaid');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(contactsCollection, {idField: 'id'})
    .pipe(
      map(FirstAidInfo => FirstAidInfo as FirstAidInfo[])
    );
  }

  getFirstAidInfoById(id: string): Observable<FirstAidInfo> {
    const document = doc(this.firestore, `basic_firstaid/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as FirstAidInfo;
      })
    );
  }
   // Add a method to get alphabetically sorted data
   getFirstAidInfoAlphabetically(): Observable<FirstAidInfo[]> {
    const herbsCollection = collection(this.firestore, 'basic_firstaid');
    // Query to order data by the 'name' field (can replace 'name' with desired field)
    const alphabeticallySortedQuery = query(
      herbsCollection,
      orderBy('name')
    );

    // This method returns a stream of documents mapped to their payload and id
    return collectionData(alphabeticallySortedQuery, { idField: 'id' })
      .pipe(
        map(herbs => herbs as FirstAidInfo[])
      );
  }

  search(searchTerm: string): Observable<FirstAidInfo[]> {
    const herbsCollection = collection(this.firestore, 'basic_firstaid');
    const squery = query(
      herbsCollection,
      orderBy('name'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );

    return collectionData(squery, { idField: 'id' }).pipe(
      map((info) => info as FirstAidInfo[])
    );
  }

  createFirstAidInfo(info:FirstAidInfo): Promise<void> {
    const document = doc(collection(this.firestore, 'basic_firstaid'));
    return setDoc(document, info);
  }

  updateFirstAidInfo(info:FirstAidInfo): Promise<void> {
    const document = doc(this.firestore, 'basic_firstaid', info?.id);
    const { id, ...data } = info;
    return setDoc(document, data);
  }

  deleteFirstAidInfo(id: string): Promise<void> {
    const document = doc(this.firestore, 'basic_firstaid', id);
    return deleteDoc(document);
  }
}
