import { Injectable } from '@angular/core';
import { HerbInfo } from './herb';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Firestore, 
  collectionData, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  docSnapshots, 
  query,
  orderBy, 
  where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class HerbinfoService {

  constructor(private firestore: Firestore) {}

  //'first_aid' = herbs database in firebase 

  getHerbInfo(): Observable<HerbInfo[]> {
    const herbsCollection = collection(this.firestore, 'first_aid');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(herbsCollection, {idField: 'id'})
    .pipe(
      map(herbCollection => herbCollection as HerbInfo[])
    );
  }

   // Add a method to get alphabetically sorted data
   getHerbInfoAlphabetically(): Observable<HerbInfo[]> {
    const herbsCollection = collection(this.firestore, 'first_aid');
    // Query to order data by the 'name' field (can replace 'name' with desired field)
    const alphabeticallySortedQuery = query(
      herbsCollection,
      orderBy('herbname')
    );

    // This method returns a stream of documents mapped to their payload and id
    return collectionData(alphabeticallySortedQuery, { idField: 'id' })
      .pipe(
        map(herbs => herbs as HerbInfo[])
      );
  }
  
  searchHerbs(searchTerm: string): Observable<HerbInfo[]> {
    const herbsCollection = collection(this.firestore, 'first_aid');
    const squery = query(
      herbsCollection,
      orderBy('herbname'),
      where('herbname', '>=', searchTerm),
      where('herbname', '<=', searchTerm + '\uf8ff')
    );

    return collectionData(squery, { idField: 'id' }).pipe(
      map((herbs) => herbs as HerbInfo[])
    );
  }
  
  getHerbInfoById(id: string): Observable<HerbInfo> {
    const document = doc(this.firestore, `first_aid/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as HerbInfo;
      })
    );
  }

  createHerbInfo(herb:HerbInfo): Promise<void> {
    const document = doc(collection(this.firestore, 'first_aid'));
    return setDoc(document, herb);
  }

  updateHerbInfo(herb:HerbInfo): Promise<void> {
    const document = doc(this.firestore, 'first_aid', herb?.id);
    const { id, ...data } = herb;
    return setDoc(document, data);
  }
  

  deleteHerbInfo(id: string): Promise<void> {
    const document = doc(this.firestore, 'first_aid', id);
    return deleteDoc(document);
  }
   // Add this method to save precautions to Firestore
   savePrecautionsToFirestore(id: string, precautions: string): Promise<void> {
    const document = doc(this.firestore, 'first_aid', id);
    return setDoc(document, { precautions }, { merge: true });
  }
}
