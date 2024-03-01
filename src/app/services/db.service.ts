import { Injectable } from '@angular/core';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?: any;

  constructor(private authServ: AuthService) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: { title?: string, code?: string }) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: this.authServ.getUid()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Something Went Wrong");
    }
  }

  async getAllSnippet() {
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return {
        id:"1",
        title:"not found",
        code:"not found"
      }
    }

  }
}
