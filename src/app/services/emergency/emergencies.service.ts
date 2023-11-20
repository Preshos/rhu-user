import { Injectable } from '@angular/core';
import { EmergencyInfo } from './emergency';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, query, orderBy,where } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class EmergenciesService {

  constructor(private firestore: Firestore) {}

  getEmergencyInfo(): Observable<EmergencyInfo[]> {
    const infoCollection = collection(this.firestore, 'emergencies');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(infoCollection, {idField: 'id'})
    .pipe(
      map(EmergencyInfo => EmergencyInfo as EmergencyInfo[])
    );
  }

  getEmergencyInfoById(id: string): Observable<EmergencyInfo> {
    const document = doc(this.firestore, `emergencies/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as EmergencyInfo;
      })
    );
  }
   // Add a method to get alphabetically sorted data
   getEmergencyInfoAlphabetically(): Observable<EmergencyInfo[]> {
    const herbsCollection = collection(this.firestore, 'emergencies');
    // Query to order data by the 'name' field (can replace 'name' with desired field)
    const alphabeticallySortedQuery = query(
      herbsCollection,
      orderBy('accidents')
    );

    // This method returns a stream of documents mapped to their payload and id
    return collectionData(alphabeticallySortedQuery, { idField: 'id' })
      .pipe(
        map(herbs => herbs as EmergencyInfo[])
      );
  }
  search(searchTerm: string): Observable<EmergencyInfo[]> {
    const herbsCollection = collection(this.firestore, 'emergencies');
    const squery = query(
      herbsCollection,
      orderBy('accidents'),
      where('accidents', '>=', searchTerm),
      where('accidents', '<=', searchTerm + '\uf8ff')
    );

    return collectionData(squery, { idField: 'id' }).pipe(
      map((info) => info as EmergencyInfo[])
    );
  }

  createEmergencyInfo(info:EmergencyInfo): Promise<void> {
    const document = doc(collection(this.firestore, 'emergencies'));
    return setDoc(document, info);
  }

  updateEmergencyInfo(info:EmergencyInfo): Promise<void> {
    const document = doc(this.firestore, 'emergencies', info?.id);
    const { id, ...data } = info;
    return setDoc(document, data);
  }

  deleteEmergencyInfo(id: string): Promise<void> {
    const document = doc(this.firestore, 'emergencies', id);
    return deleteDoc(document);
  }
}
