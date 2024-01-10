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

  //'' = herbs database in firebase 

  getHerbInfo(): Observable<HerbInfo[]> {
    const herbsCollection = collection(this.firestore, 'herbal_plants');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(herbsCollection, {idField: 'id'})
    .pipe(
      map(herbCollection => herbCollection as HerbInfo[])
    );
  }

   // Add a method to get alphabetically sorted data
   getHerbInfoAlphabetically(): Observable<HerbInfo[]> {
    const herbsCollection = collection(this.firestore, 'herbal_plants');
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

// // herb name gets partially searched, and keywords can be partially matched
// searchHerbs(searchTerm: string): Observable<HerbInfo[]> {
//   const herbsCollection = collection(this.firestore, 'herbal_plants');

//   // Convert searchTerm into lowercase array of keywords
//   const searchKeywords = searchTerm.toLowerCase().split(' ');

//   const squery = query(
//       herbsCollection,
//       orderBy('herbname'),
//   );

//   return collectionData(squery, { idField: 'id' }).pipe(
//       map((herbs) => {
//           // Filter the herbs based on partial match in herbname or partial match in keywords
//           const filteredHerbs = herbs.filter(herb => {
//               const herbnameMatch = herb['herbname'].toLowerCase().includes(searchTerm.toLowerCase());
//               const keywordMatch = Array.isArray(herb['keywords']) && herb['keywords'].some(keyword =>
//                   searchKeywords.some(searchWord => keyword.includes(searchWord))
//               );

//               return herbnameMatch || keywordMatch;
//           });

//           return filteredHerbs as HerbInfo[];
//       })
//   );
// }



  // herb name gets partially search but the keywords must be full
  searchHerbs(searchTerm: string): Observable<HerbInfo[]> {
    const herbsCollection = collection(this.firestore, 'herbal_plants');
  
    // Convert searchTerm into lowercase array of keywords
    const searchKeywords = searchTerm.toLowerCase().split(' ');
  
    const squery = query(
      herbsCollection,
      orderBy('herbname'),
    );
    return collectionData(squery, { idField: 'id' }).pipe(
      map((herbs) => {
        // Filter the herbs based on partial match in herbname or keywords
        const filteredHerbs = herbs.filter(herb =>
          herb['herbname'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          (Array.isArray(herb['keywords']) && searchKeywords.every(keyword =>
            herb['keywords'].includes(keyword)
          ))
        );
  
        return filteredHerbs as HerbInfo[];
      })
    );
  }
  
  getHerbInfoById(id: string): Observable<HerbInfo> {
    const document = doc(this.firestore, `herbal_plants/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as HerbInfo;
      })
    );
  }


  createHerbInfo(herb: Omit<HerbInfo, 'id'>): Promise<void> {
    // Create a document in the 'herbal_plants' collection with an auto-generated ID
    const document = doc(collection(this.firestore, 'herbal_plants'));

    // Convert herbname, description, and uses into lowercase arrays of keywords
    const herbnameKeywords = this.extractKeywords(herb.herbname);
    const otherKeywords = this.extractKeywords(herb.other_name);
    
    // Extract titles from the uses and convert them into lowercase arrays of keywords
    const useKeywords = herb.uses?.map(uses => this.extractKeywords(uses.title)) || [];

    // // Combine keywords from all fields
    const allKeywords = [...new Set([...herbnameKeywords, ...otherKeywords].concat(...useKeywords))];
    // Combine keywords from all fields

    // const allKeywords = [...new Set([...herbnameKeywords, ...otherKeywords])];

    // Add the keywords array to the herb object
    herb.keywords = allKeywords;

    console.log('Herb created to Firestore:', herb);

    // Set the data for the document, including the 'id' property
    return setDoc(document, { ...herb, id: document.id });
}

updateHerbInfo(herb: HerbInfo): Promise<void> {
  const document = doc(this.firestore, 'herbal_plants', herb?.id);

  // Remove symbols and convert herbname, description, and uses into lowercase arrays of keywords
  const herbnameKeywords = this.extractKeywords(herb.herbname);
  const otherKeywords = this.extractKeywords(herb.other_name);

   // Extract titles from the uses and convert them into lowercase arrays of keywords
   const useKeywords = herb.uses?.map(uses => this.extractKeywords(uses.title)) || [];

   // // Combine keywords from all fields
   const allKeywords = [...new Set([...herbnameKeywords, ...otherKeywords].concat(...useKeywords))];
  
  // // Combine keywords from all fields
  // const allKeywords = [...new Set([...herbnameKeywords, ...otherKeywords])];

  // Add the keywords array to the herb object
  herb.keywords = allKeywords;

  const { id, ...data } = herb;
  console.log('Herb updated to Firestore:', herb);
  return setDoc(document, data);
  }
  
  // to extract keywords and remove symbols, including newlines
  extractKeywords(text: string): string[] {
  const sanitizedText = text.replace(/[^\w\s]/g, '').replace(/[\n\r]/g, ' '); // Remove non-alphanumeric characters and replace newlines with spaces
  return sanitizedText.toLowerCase().split(' ');
}

  // updateHerbInfo(info: HerbInfo): Promise<void> {
  //   // Get the document in the 'basic_firstaid' collection
  //   const document = doc(this.firestore, 'herbal_plants', info?.id);
  
  //   // Update the data for the existing document
  //   return setDoc(document, info);
  // }
  

  deleteHerbInfo(id: string): Promise<void> {
    const document = doc(this.firestore, 'herbal_plants', id);
    return deleteDoc(document);
  }

   // Add this method to save precautions to Firestore
   savePrecautionsToFirestore(id: string, precautions: string): Promise<void> {
    const document = doc(this.firestore, '', id);
    return 
    setDoc(document, { precautions }, { merge: true });
  }

 
}
