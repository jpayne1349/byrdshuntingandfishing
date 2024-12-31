import { generateUUID } from "$lib/helpers/id";
import { fb } from "$lib/stores/firebase";
import { instanceToPlain } from "class-transformer";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { get } from "svelte/store";

export class Photo {
  id: string;
  added: number;
  updated?: number;
  hidden?: boolean;

  title: string;
  description: string;
  category: string;
  subcategory: string;

  price?: string;
  url?: string;

  constructor(options: {
    title: string;
    description: string;
    category: string;
    subcategory: string;
  }) {
    this.id = generateUUID("photo_");
    this.title = options.title;
    this.description = options.description;
    this.category = options.category;
    this.subcategory = options.subcategory;
    this.added = Math.floor(Date.now() / 1000);
  }

  async savePhoto(file: File) {
    if (this.url) {
      this.updated = Math.floor(Date.now() / 1000);
    }

    try {
      const firebaseObject = get(fb);
      // SAVE TO STORAGE
      const storagePath = this.category + "/" + this.subcategory;
      const photoRef = ref(firebaseObject.storage, storagePath);
      const upload = await uploadBytes(photoRef, file);
      console.log('Uploaded file: ', upload);
      this.url = await getDownloadURL(photoRef);
      // SAVE TO DB
      let plainObject = instanceToPlain(this, { exposeUnsetFields: false });
      const docRef = doc(firebaseObject.db, "events", this.id);
      await setDoc(docRef, plainObject);
    } catch (e) {
      console.log(e);
    }
  }
}

export interface Relation {
  id: string;
  object_type: string; // Booking, Unit, User, File, etc
  object_id: string;

  db_path?: string;
  rms_link?: string;

  title?: string;
  description?: string;
}
